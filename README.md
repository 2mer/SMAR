# SMAR

Spam Me A River

An application powered by electron
used to create macros on the fly,
with api dedicated towards quick implementation of automatic messaging / clicking
invokable via global hotkeys

![image](https://user-images.githubusercontent.com/32102817/158082223-61af8d36-395a-418d-8dd9-c0e6f0fe7335.png)

## Installation

-   Get the desired version installer for your corresponding OS from the [releases](https://github.com/LeRedditBro/SMAR/releases)
-   Use the installer
-   Shortly after the app will open, and a shortcut should appear on your desktop

## Uninstall

Search for the same app name in your corresponding os program manager and uninstall it from there

## Exec Mode API

The [ExposedAPI](https://github.com/LeRedditBro/SMAR/blob/main/src/main/Execution/ExecutionApi.ts#L7) class will be exposed when running the script, accessible via the `api` global, along with the `index` global - indicating the iteration of the script

See ExecutionAPI

## Releasing a version

-   bump version in release/app/package.json
-   run yarn package
