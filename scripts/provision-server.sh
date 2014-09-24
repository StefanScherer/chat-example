#!/bin/bash

sudo apt-get update
sudo apt-get install -y nodejs
sudo ln -s /usr/bin/nodejs /usr/bin/node
sudo apt-get install -y npm
sudo npm install -g grunt-cli
sudo chown -R vagrant /home/vagrant/tmp
