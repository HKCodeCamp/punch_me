#Punch Me If You Can

Interactive animation software

---


## Source Code Repository

[Punch Me Server](https://github.com/hkcodecamp/punch_me)
[Android Client](https://github.com/hkcodecamp/punch_me_android)
[Kinect Adapter Client](https://github.com/hkcodecamp/punch_me_kinect_adapter)
[Wii Remote Adapter Client](https://github.com/hkcodecamp/punch_me_wiiremote)
[iOS Client](https://github.com/hkcodecamp/punch_me_ios)


## Workflow
* a photo being displayed on the screen.
* the user stands in front of the screen and punch, the photo image being distorted and manipulated
* the user can also hold different devices and punch (we have implemented Android, iPhone, WiiRemote clients)


## System Components

Punch Me Server (ruby event machine on thin) listens for TCP packet and send out PUNCH message to web page thru Web Socket (faye).
[Project Page](http://hkcodecamp.github.com/punch_me)

## Features

#### Display Module
* when the system receives a PUNCH message, image shakes
* when the system receives a PUNCH message, colourful firework displayed
* when the system receives a PUNCH message, image is broken into pieces
* when the system receives a PUNCH message, damage is accumulated and display as HP bar
* client devices can submit new photo thru TCP and replace the default one

#### Motion Detection Clients
* Kinect (OpenNI and NITE), Android, iPhone, WiiRemote (wiigee and bluecove)
* Detect PUSH and SWIPE gesture
* sends out PUNCH TCP messages to server

## Setup Kinect Libraries on Mac

### If you are using Mac 10.8

Follow the steps in the Usage and Install setcion:

> https://github.com/totakke/openni-formula

> append --devel for all the brew install command


If the brew install sensor-kinect fails,

1. download the binary

    https://github.com/avin2/SensorKinect/downloads

2. compile and install

        sudo ./install.sh

3. link the niReg

    you should see the following error when you manually compile and install sensor-kinect:

        registering module 'libXnDeviceSensorV2KM.dylib' with OpenNI..../install.sh: line 111: /usr/bin/niReg: No such file or directory

    link the command line niReg so that the manual install can run:

            sudo ln -s /usr/local/bin/niReg /usr/bin/niReg

    The main reason for doing this is because the niReg is setup when you brew install openni, so the path that the install.sh (of sensor-kinect) expecting does not match.

After installing everything, run the sample in:

        /usr/local/Cellar/openni/unstable-1.5.4.0/sample/Bin/x64-Release
        ./Sample-NiSimpleViewer


## Team member
* **Alvin Hon**
* **Chris Yuen**
* **Eddie Lau** [3dd13](https://github.com/3dd13/)
* **Lincoln Lee** [linc01n](https://github.com/linc01n/)

