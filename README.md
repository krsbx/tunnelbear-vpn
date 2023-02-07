<h1 align="center">
  Tunnelbear VPN
</h1>

<p align="center">
  An un-official Tunnelbear VPN client made with React, Electron, TypeScript, and Vite.
</p>

<p align="center">
  Get started by using Tunnelbear VPN linux client by downloading it from <a href="https://github.com/krsbx/tunnelbear-vpn/releases">releases</a> to secure your internet connections.
</p>

## Table of contents

- <a href="#about">What is Tunnelbear VPN?</a>
- <a href="#how-to">How to use</a>
- <a href="#contributors">Contributors</a>

<h2 id="about">What is Tunnelbear VPN?</h2>

"_Tunnelbear VPN_" is a public VPN service based on Toronto, Canada. Sadly, it only support Windows, Mac, Android, and iOS which led to no _client app_ for GNU/Linux users. This project is solving that issue by creating a simple client that user can import which VPN config they want to use.

<h2 id="how-to">How to use</h2>

To use this "_un-official Tunnelbear VPN client_", you need to do this following steps.

1. Download the prebuild client app from the <a href="https://github.com/krsbx/tunnelbear-vpn/releases">releases</a> page or build it by forking the repo.
2. Download the "_Tunnelbear VPN OpenVPN Config_" from the official <a href="https://www.tunnelbear.com/blog/linux_support/">blog posts</a> or by downloading the config straight from their <a href="https://tunnelbear.s3.amazonaws.com/support/linux/openvpn.zip">download link</a>.
   > The direct link are from the blog post that the Tunnelbear provide. If you are scared that it was a scam or something, you can just try to download it from the blog post that Tunnelbear provides.
3. Extract all the configs or extract which config that you want to a certain directory.
   > Keep in mind that you cannot delete this directory since the app will save the directory locations for each the config that you are going to import.
4. Run/Launch the client and import the config files that you just extracts.
5. Configure the auth by clicking the "_Configure Auth_" button on the top bar.
   > The app will keep your credentials on the localstorage so it can be used again if you decide to change your VPN connections profile.
   > As stated previously, the credentials is stored in the localstorage of the client and is not being used to do any kind actions to take your account or anything.
6. Click to which VPN config that you want to connect and gave the `sudo` permissions.
   > The client app is need to use sudo permissions to make an OpenVPN connections. No worries, this `sudo` only being use for creating a connections/disconnecting the OpenVPN connections.
7. Surf the internet while the bear securing your connections!.

<h2 id="contributors">Contributors</h2>

We 💖 contributors! Feel free to contribute to this project but **please read the [Contributing Guidelines](CONTRIBUTING.md) before opening an issue or PR** so you understand the branching strategy and local development environment.
