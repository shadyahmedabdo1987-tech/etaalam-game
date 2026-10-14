package main

import (
	_ "embed"
	"encoding/base64"
	"io"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"syscall"
	"unicode/utf16"
)

//go:embed index.html
var page []byte

//go:embed voice3.js
var voice3 []byte

//go:embed voice4.js
var voice4 []byte

//go:embed voice5.js
var voice5 []byte

//go:embed voice2.js
var voice2 []byte

//go:embed voice.js
var voice []byte

//go:embed three.min.js
var three []byte

func hidden(c *exec.Cmd) *exec.Cmd {
	c.SysProcAttr = &syscall.SysProcAttr{HideWindow: true, CreationFlags: 0x08000000}
	return c
}

func exists(p string) bool { _, err := os.Stat(p); return err == nil }

func findBrowser() string {
	var cands []string
	for _, env := range []string{"ProgramFiles(x86)", "ProgramFiles", "LOCALAPPDATA"} {
		if b := os.Getenv(env); b != "" {
			cands = append(cands, filepath.Join(b, `Microsoft\Edge\Application\msedge.exe`))
		}
	}
	for _, env := range []string{"ProgramFiles", "ProgramFiles(x86)", "LOCALAPPDATA"} {
		if b := os.Getenv(env); b != "" {
			cands = append(cands, filepath.Join(b, `Google\Chrome\Application\chrome.exe`))
		}
	}
	for _, c := range cands {
		if exists(c) {
			return c
		}
	}
	return ""
}

func psEncoded(script string) string {
	u := utf16.Encode([]rune(script))
	b := make([]byte, len(u)*2)
	for i, v := range u {
		b[i*2] = byte(v)
		b[i*2+1] = byte(v >> 8)
	}
	return base64.StdEncoding.EncodeToString(b)
}

func installSelf(dir string) {
	self, err := os.Executable()
	if err != nil {
		return
	}
	target := filepath.Join(dir, "MissNour.exe")
	if !strings.EqualFold(filepath.Clean(self), filepath.Clean(target)) {
		if in, err := os.Open(self); err == nil {
			if out, err := os.Create(target); err == nil {
				io.Copy(out, in)
				out.Close()
			}
			in.Close()
		}
	}
	marker := filepath.Join(dir, "shortcut2.done")
	if exists(marker) || !exists(target) {
		return
	}
	esc := func(s string) string { return strings.ReplaceAll(s, "'", "''") }
	script := "$d=[Environment]::GetFolderPath('Desktop');" +
		"Remove-Item -LiteralPath (Join-Path $d 'ميس نور.lnk') -ErrorAction SilentlyContinue;" +
		"$s=(New-Object -ComObject WScript.Shell).CreateShortcut((Join-Path $d 'إتعلم مع آل عبده.lnk'));" +
		"$s.TargetPath='" + esc(target) + "';$s.WorkingDirectory='" + esc(dir) + "';" +
		"$s.IconLocation='" + esc(target) + ",0';$s.Description='إتعلم مع آل عبده';$s.Save()"
	if err := hidden(exec.Command("powershell", "-NoProfile", "-NonInteractive", "-WindowStyle", "Hidden", "-EncodedCommand", psEncoded(script))).Run(); err == nil {
		os.WriteFile(marker, []byte("ok"), 0644)
	}
}

func main() {
	base := os.Getenv("LOCALAPPDATA")
	if base == "" {
		base = os.TempDir()
	}
	dir := filepath.Join(base, "MissNour")
	os.MkdirAll(dir, 0755)
	pagePath := filepath.Join(dir, "index.html")
	os.WriteFile(pagePath, page, 0644)
	os.WriteFile(filepath.Join(dir, "voice.js"), voice, 0644)
	os.WriteFile(filepath.Join(dir, "voice2.js"), voice2, 0644)
	os.WriteFile(filepath.Join(dir, "voice3.js"), voice3, 0644)
	os.WriteFile(filepath.Join(dir, "voice4.js"), voice4, 0644)
	os.WriteFile(filepath.Join(dir, "voice5.js"), voice5, 0644)
	os.WriteFile(filepath.Join(dir, "three.min.js"), three, 0644)
	installSelf(dir)

	url := "file:///" + strings.ReplaceAll(pagePath, `\`, "/")
	if b := findBrowser(); b != "" {
		exec.Command(b,
			"--app="+url,
			"--user-data-dir="+filepath.Join(dir, "profile"),
			"--window-size=1100,820",
			"--no-first-run", "--no-default-browser-check",
			"--autoplay-policy=no-user-gesture-required",
		).Start()
		return
	}
	hidden(exec.Command("rundll32", "url.dll,FileProtocolHandler", url)).Start()
}
