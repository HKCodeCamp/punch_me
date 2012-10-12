#Punch Me If You Can

Interactive animation software

---


###Ideas
* kinect + android + iphone + ruby + html5
* a gallery of photos of peoples faces
* the user punches the screen and the gallery changes photo
* the premium version lets you add your own photos


###Features and System Components
[Project Page](http://hkcodecamp.github.com/punch_me)


### Setup Kinect Libraries on Mac

#### If you are using Mac 10.8

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


###Team member
* **Alvin Hon**
* **Chris Yuen**
* **Eddie Lau** [3dd13](https://github.com/3dd13/)
* **Lincoln Lee** [linc01n](https://github.com/linc01n/)

