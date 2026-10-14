#!/bin/sh
# Builds signed Play bundle (.aab) + test APK from android/proj
set -e
cd /home/claude/build/play; export JAVA_TOOL_OPTIONS=; PW=$(cat keystore-password.txt)
cp ../app/index.html ../app/voice*.js ../app/three.min.js ../android/proj/assets/
java -jar ../tools/apktool.jar b ../android/proj -o ../android/unsigned.apk >/dev/null
rm -rf proto.apk base base.zip app.aab u.apks universal.apk
./aapt2_64 convert --output-format proto -o proto.apk ../android/unsigned.apk
mkdir base; cd base; unzip -q ../proto.apk; mkdir -p manifest dex root; mv AndroidManifest.xml manifest/; mv classes*.dex dex/; rm -rf META-INF
for f in *; do case $f in manifest|dex|res|assets|lib|root|resources.pb) ;; *) mv "$f" root/;; esac; done
zip -q -r -D ../base.zip .; cd ..
java -jar ../tools/bundletool.jar build-bundle --modules=base.zip --output=app.aab
jarsigner -keystore alabdo-upload.jks -storepass "$PW" -sigalg SHA256withRSA -digestalg SHA-256 app.aab upload >/dev/null
java -jar ../tools/bundletool.jar build-apks --bundle=app.aab --output=u.apks --mode=universal --ks=alabdo-upload.jks --ks-key-alias=upload --ks-pass=pass:$PW --key-pass=pass:$PW
unzip -o -q u.apks universal.apk
V=$(grep versionName ../android/proj/apktool.yml | awk '{print $2}')
cp app.aab "إتعلم-مع-آل-عبده-$V.aab"; cp universal.apk "إتعلم-مع-آل-عبده-$V-تجربة.apk"
jarsigner -verify app.aab | head -1
