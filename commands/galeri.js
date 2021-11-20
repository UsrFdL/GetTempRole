const data = require("../util/dataBase.json")
const { MessageCollector } = require("discord.js")
module.exports = {
  name: "galeri",
  description: 'mendapatkan role galeri',
  execute(message){
    const filter = m => m.author.id === message.author.id
    message.channel.send("Masukkan **Username**")
    const collector = new MessageCollector(message.channel, {filter, max: 1})
    collector.on("collect", (usr) => {
      if(usr.content == data.username){
        message.channel.send("Masukkan **Password**")
        const collector = new MessageCollector(message.channel, {filter, max: 1})
        collector.on("collect", (pw) => {
          if(pw.content == data.password){
              const user = message.author.id
              var member = message.guild.members.cache.find(member => member.id === user)
              var role = message.guild.roles.cache.find(r => r.name === "galeri")
              member.roles.add(role.id).then(() => {
                setTimeout(() => {
                  member.roles.remove(role.id)
                },1000*3)
              })
            }
            else{
              message.channel.send("**Password** yang anda masukkan salah")
            }
        })
      }
      else{
        message.channel.send("**Username** yang anda masukkan salah")
      }
    })
  }    
}