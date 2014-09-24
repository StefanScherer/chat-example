# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|

  # the REST server
  config.vm.define "server", primary: true do |server|
    server.vm.box = "ubuntu1404"
  
    server.vm.hostname = "server"
    server.vm.network :private_network, ip: "172.16.32.2" # VirtualBox
  
    server.vm.provision "shell", privileged: false, path: "scripts/provision-server.sh"
  
    server.vm.provider "virtualbox" do |v|
      v.memory = 1024
      v.cpus = 1
    end
  end

  config.vm.define "client01" do |slave|
    slave.vm.box = "windows_7_ultimate"
    slave.vm.hostname = "client01"

    slave.vm.communicator = "winrm"
    slave.vm.network :forwarded_port, guest: 5985, host: 5985, id: "winrm", auto_correct: true
    slave.vm.network :forwarded_port, guest: 22, host: 2222, id: "ssh", auto_correct: true
    slave.vm.network :forwarded_port, guest: 3389, host: 3389, id: "rdp", auto_correct: true

    slave.vm.network :private_network, ip: "172.16.32.3" # VirtualBox

    slave.vm.provision "shell", path: "scripts/provision-client.bat"
    slave.vm.provider "virtualbox" do |v|
      v.gui = true
      v.memory = 1024
      v.cpus = 1
      v.customize ["modifyvm", :id, "--clipboard", "bidirectional"]
      v.customize ["modifyvm", :id, "--vram", "32"]
    end
  end

  config.vm.define "client02" do |slave|
    slave.vm.box = "windows_7_ultimate"
    slave.vm.hostname = "client02"

    slave.vm.communicator = "winrm"
    slave.vm.network :forwarded_port, guest: 5985, host: 5985, id: "winrm", auto_correct: true
    slave.vm.network :forwarded_port, guest: 22, host: 2222, id: "ssh", auto_correct: true
    slave.vm.network :forwarded_port, guest: 3389, host: 3389, id: "rdp", auto_correct: true

    slave.vm.network :private_network, ip: "172.16.32.4" # VirtualBox

    slave.vm.provision "shell", path: "scripts/provision-client.bat"
    slave.vm.provider "virtualbox" do |v|
      v.gui = true
      v.memory = 2048
      v.cpus = 2
      v.customize ["modifyvm", :id, "--clipboard", "bidirectional"]
      v.customize ["modifyvm", :id, "--vram", "32"]
    end
  end

end
