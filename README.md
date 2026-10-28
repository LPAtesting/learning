# DealCraft

One GitHub repository gives you three things: a web link for any device, an Android APK built automatically, and progress synced between them.

## 1. Put this folder on GitHub (once)

1. On github.com, create a new repository, for example `dealcraft`. Make it **Public**: GitHub Pages is free only for public repositories. Your progress is stored separately and is not in the repository.
2. In the new repository, choose **Add file → Upload files** and drag in everything inside this folder (not the folder itself). Commit.
3. Check that `.github/workflows/build-apk.yml` arrived. Some computers hide folders starting with a dot and skip them. If it is missing, choose **Add file → Create new file**, type `.github/workflows/build-apk.yml` as the name, paste the file's contents and commit.

## 2. Turn on the web link

Settings → Pages → Build and deployment → Source: **Deploy from a branch** → Branch: **main**, folder **/ (root)** → Save.

After a minute or two, your link appears at the top of that page: `https://YOUR-USERNAME.github.io/dealcraft/`. Open it on your computer and phone. On the phone you can also use the browser's **Add to Home screen**.

## 3. Get the APK

Open the **Actions** tab. The **Build APK** run starts by itself after your upload; it takes about 5–10 minutes. When it shows a green tick, open it and download **dealcraft-apk** under Artifacts. Unzip it and install `app-debug.apk` on your phone (allow installs from this source when Android asks).

The first build saves a signing key (`android/debug.keystore`) to the repository, so later APKs install over the old one and keep your data. If Android refuses to install this first one over an older DealCraft, uninstall the old app first. Progress in that old version can't be carried over, because it had no sync.

To rebuild by hand at any time: Actions → Build APK → **Run workflow**.

## 4. Turn on sync

1. On your computer, open https://github.com/settings/tokens/new?scopes=gist&description=DealCraft%20sync . The **gist** scope is already ticked. Choose an expiry, press **Generate token** and copy it.
2. In DealCraft, go to **Profile → Sync across devices**, paste the token and press **Connect**.
3. Do the same on each device (web link and APK) with the same token.

Your progress and mistake log are stored in a secret gist on your account called `dealcraft-sync.json`. Secret gists are unlisted but not encrypted: anyone who has the gist's exact address can open it. The app syncs when it opens, after each session and every few minutes while you study. When the token expires, create a new one and connect again.

## Updating

When the app changes, upload the changed files over the old ones (Add file → Upload files). The web link updates within a minute, and a new APK is built automatically whenever anything in `android/` changes.

## LAW302 learning journey (Track 3)

Track 3 holds LAW302 Commercial Conflict of Laws, Weeks 12 and 13 (Foreign Judgments I and II). Each week is a part with its own exam, each stage is a chapter, and each module is a lesson. A lesson opens with a module reader (Objective, ELI5, Big idea, Rules & authorities, Traps, plus the decision trees and the three-regime comparison) and ends with its practice questions, each with feedback on every option and a hint. The week header has an ELI5 quick pass, the sources and notes for that week, and weak spots grouped by topic tag. LAW302 counts towards your daily goal like the other tracks (switch it off under Profile → Settings → Tracks in your daily goal), but its daily questions come only from modules you have read. Which modules you have read syncs across devices with the rest of your progress.

To add another week, save its "Learning Journey + MCQ" file in the same format and rebuild the data and the APK page:

```
python3 tools/law302_import.py Week12.md Week13.md Week14.md > data/law302.js
python3 tools/bundle_android.py
```

For a new week number, first add its title, colours and one-line summary to `WEEKS` at the top of `tools/law302_import.py`.

## Desktop mode

Profile → Settings → Desktop mode (or the screen button at the top right on a wide window) switches to a wide layout: a sidebar for tabs and tracks, a course outline beside the path, a two-column module reader and a full comparison table. The setting is kept per device.
