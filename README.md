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

3. link the niReg (because this module is not installed into path of Homebrew)

        ln -s 

4. After installing everything, run the sample in:

        /usr/local/Cellar/openni/unstable-1.5.4.0/sample/Bin/x64-Release
        ./Sample-NiSimpleViewer 


###Team member
* **Alvin Hon**
* **Chris Yuen**
* **Eddie Lau** [3dd13](https://github.com/3dd13/)
* **Lincoln Lee**

