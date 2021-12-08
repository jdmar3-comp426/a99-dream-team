from PIL import Image

img = Image.open("unc.jpg")
width, height = img.size
subwidth = width//6
subheight = height//4

for i in range(4):
    for j in range(6):
        subimg = img.crop((j*subwidth,i*subheight,(j+1)*subwidth,(i+1)*subheight))
        subimg.save("unc{}.jpg".format(i*6+j))