package com.missnour.learn;

import android.app.Activity;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.view.WindowInsets;
import android.webkit.ValueCallback;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.webkit.WebChromeClient;
import android.widget.FrameLayout;

public class MainActivity extends Activity {
  private WebView web;

  @Override
  protected void onCreate(Bundle b) {
    super.onCreate(b);
    getWindow().addFlags(128); // keep screen on while playing
    getWindow().addFlags(0x80000000);
    getWindow().setStatusBarColor(0xFF4332C2);
    getWindow().setNavigationBarColor(0xFF4332C2);
    final FrameLayout root = new FrameLayout(this);
    root.setBackgroundColor(0xFF4332C2);
    web = new WebView(this);
    web.setBackgroundColor(0xFFDCEFFF);
    WebSettings s = web.getSettings();
    s.setJavaScriptEnabled(true);
    s.setDomStorageEnabled(true);
    s.setMediaPlaybackRequiresUserGesture(false);
    s.setAllowFileAccess(true);
    s.setTextZoom(100);
    web.setWebViewClient(new WebViewClient());
    web.setWebChromeClient(new WebChromeClient());
    root.addView(web);
    if (Build.VERSION.SDK_INT >= 35) {
      // Android 15+ draws edge-to-edge: keep the game clear of the status and navigation bars
      root.setOnApplyWindowInsetsListener(new View.OnApplyWindowInsetsListener() {
        public WindowInsets onApplyWindowInsets(View v, WindowInsets i) {
          v.setPadding(i.getSystemWindowInsetLeft(), i.getSystemWindowInsetTop(), i.getSystemWindowInsetRight(), i.getSystemWindowInsetBottom());
          return i;
        }
      });
    }
    setContentView(root);
    web.loadUrl("file:///android_asset/index.html");
  }

  @Override
  public void onBackPressed() {
    web.evaluateJavascript("(function(){var b=document.getElementById('backBtn');if(b&&!b.hidden){b.click();return 'y'}return 'n'})()",
      new ValueCallback<String>() {
        public void onReceiveValue(String v) { if (v == null || v.indexOf('y') < 0) finish(); }
      });
  }

  @Override
  protected void onPause() { super.onPause(); web.onPause(); }

  @Override
  protected void onResume() { super.onResume(); web.onResume(); }
}
