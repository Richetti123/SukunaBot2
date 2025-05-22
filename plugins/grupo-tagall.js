let handler = async(m, { isOwner, isAdmin, conn, text, participants, args, command }) => {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}

if (command == 'tagall' || command == 'invocar' || command == 'todos' || command == 'invocación' || command == 'invocacion') {
let pesan = args.join` `
let oi = `@requibots ${pesan}`
let teks = `Expansión de dominó: El reinó de las etiquetas\n\n${oi}\n\n`
for (let mem of participants) {
teks += `🐍 @${mem.id.split('@')[0]}\n`}
teks += `${global.packname}`
conn.sendMessage(m.chat, { text: teks, mentions: participants.map(a => a.id) }, )  
}

if (command == 'contador') {
let memberData = participants.map(mem => {
let userId = mem.id;
let userData = global.db.data.users[userId] || {};
let msgCount = userData.mensaje && userData.mensaje[m.chat] ? userData.mensaje[m.chat] : 0;
return { id: userId, messages: msgCount };
});
memberData.sort((a, b) => b.messages - a.messages);
let activeCount = memberData.filter(mem => mem.messages > 0).length;
let inactiveCount = memberData.filter(mem => mem.messages === 0).length;
  
let teks = `${global.packname} te invoca despiertate😡!!\n\n*📊 Actividad del grupo 📊*\n\n`;
teks += `Grupo: ${await conn.getName(m.chat)}\n`;
teks += `Total de miembros: ${participants.length}\n`;
teks += `Miembros activos: ${activeCount}\n`;
teks += `Miembros inactivos: ${inactiveCount}\n\n`;
teks += `Lista de miembros:\n`;
  
for (let mem of memberData) {
teks += `🤖 @${mem.id.split('@')[0]} - Mensajes: ${mem.messages}\n`;
}
conn.sendMessage(m.chat, { text: teks, mentions: memberData.map(a => a.id) }, { quoted: m });
}
}
handler.command = /^(tagall|invocar|invocacion|todos|invocación|contador)$/i
handler.admin = true
handler.group = true
export default handler
