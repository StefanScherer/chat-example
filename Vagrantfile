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

  config.vm.define "client01" do |client|
    client.vm.box = "windows_7_ultimate"
    client.vm.hostname = "client01"

    client.vm.communicator = "winrm"
    client.vm.network :forwarded_port, guest: 5985, host: 5985, id: "winrm", auto_correct: true
    client.vm.network :forwarded_port, guest: 22, host: 2222, id: "ssh", auto_correct: true
    client.vm.network :forwarded_port, guest: 3389, host: 3389, id: "rdp", auto_correct: true

    client.vm.network :private_network, ip: "172.16.32.3" # VirtualBox

    client.vm.provision "shell", path: "scripts/provision-client.bat"
    client.vm.provider "virtualbox" do |v|
      v.gui = true
      v.memory = 1024
      v.cpus = 1
      v.customize ["modifyvm", :id, "--clipboard", "bidirectional"]
      v.customize ["modifyvm", :id, "--vram", "32"]
    end
    ["vmware_fusion", "vmware_workstation"].each do |provider|
       client.vm.provider provider do |v, override|
         v.gui = true
         v.vmx["memsize"] = "1024"
         v.vmx["numvcpus"] = "1"
      end
    end
  end

  config.vm.define "client02" do |client|
    client.vm.box = "windows_7_ultimate"
    client.vm.hostname = "client02"

    client.vm.communicator = "winrm"
    client.vm.network :forwarded_port, guest: 5985, host: 5985, id: "winrm", auto_correct: true
    client.vm.network :forwarded_port, guest: 22, host: 2222, id: "ssh", auto_correct: true
    client.vm.network :forwarded_port, guest: 3389, host: 3389, id: "rdp", auto_correct: true

    client.vm.network :private_network, ip: "172.16.32.4" # VirtualBox

    client.vm.provision "shell", path: "scripts/provision-client.bat"
    client.vm.provider "virtualbox" do |v|
      v.gui = true
      v.memory = 2048
      v.cpus = 2
      v.customize ["modifyvm", :id, "--clipboard", "bidirectional"]
      v.customize ["modifyvm", :id, "--vram", "32"]
    end
    ["vmware_fusion", "vmware_workstation"].each do |provider|
       client.vm.provider provider do |v, override|
         v.gui = true
         v.vmx["memsize"] = "1024"
         v.vmx["numvcpus"] = "1"
      end
    end
  end

end
