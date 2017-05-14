# illustrator
Command line tool to extract drawing information from a photo.

## Results, Photo Decomposition Algorithm

### La Joconde

![original](samples/b.jpg "original")
![sketch-outline](samples/sketch-outline.b.jpg "sketch-outline")
![show-steps](samples/show-steps.b.jpg "show-steps")
![find-shadows](samples/find-shadows.b.jpg "find-shadows")

### Bathroom Selfie

![original](samples/a.jpg "original")
![sketch-outline](samples/sketch-outline.a.jpg "sketch-outline")
![show-steps](samples/show-steps.a.jpg "show-steps")
![find-shadows](samples/find-shadows.a.jpg "find-shadows")

## Before you get started.
1. Your image should be well balanced in terms of contrast, shadows darks. (Take a good portrait photo.)
2. We will be working with pencils, so your image should be Grayscale. (Optional, the program will do it for you.)
3. Apply soft blur to your image, let the blur blur-up what you don't care about (ex wrinkles, textures)


## Installation

```bash

npm install -g illustrator

```

## Usage

```bash

illustrator sketch samples/a.jpg
illustrator sketch samples/?.jpg
illustrator sketch ~/Desktop/samples/*.jpg

```
