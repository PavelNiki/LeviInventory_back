// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();

// async function main() {
//   await prisma.rooms.createMany({
//     data: [{ name: "ruby" }, { name: "noda" }, { name: "storage" }],
//   });
//   await prisma.categories.createMany({
//     data: [{ name: "furniture" }, { name: "device" }],
//   });
//   await prisma.inventory.createMany({
//     data: [
//       {
//         category: "furniture",
//         name: "monitor",
//         roomName: "node",
//         itemImage: "{{$timestamp}}",
//       },
//       {
//         category: "furniture",
//         name: "monitor",
//         roomName: "node",
//         itemImage: "{{$timestamp}}",
//       },
//       {
//         category: "device",
//         name: "PC",
//         roomName: "node",
//         itemImage: "{{$timestamp}}",
//       },
//       {
//         category: "device",
//         name: "PC",
//         roomName: "ruby",
//         itemImage: "{{$timestamp}}",
//       },
//       {
//         category: "device",
//         name: "keybord",
//         roomName: "node",
//         itemImage: "{{$timestamp}}",
//       },
//       {
//         category: "device",
//         name: "mouse",
//         roomName: "node",
//         itemImage: "{{$timestamp}}",
//       },
//       {
//         category: "device",
//         name: "headphones",
//         roomName: "node",
//         itemImage: "{{$timestamp}}",
//       },
//       {
//         category: "device",
//         name: "mouse",
//         roomName: "node",
//         itemImage: "{{$timestamp}}",
//       },
//     ],
//   });
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
