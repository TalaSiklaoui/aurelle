import "dotenv/config";
import pkg from "@prisma/client";
const { PrismaClient } = pkg;
import { PrismaNeon } from "@prisma/adapter-neon";

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const products = [
  {
    title: "Starlight Bangle",
    price: 68,
    image: "/images/Aure_br01.jpeg",
    category: "Bracelets",
    description:
      "A delicate 18k gold vermeil bangle detailed with subtle star accents, perfect for everyday elegance.",
  },
  {
    title: "Double Layer Bangle",
    price: 78,
    image: "/images/Aure_br02.jpeg",
    category: "Bracelets",
    description:
      "A layered 18k gold vermeil bangle pairing a smooth bar with a delicate chain.",
  },
  {
    title: "Twist Nail Bracelet",
    price: 89,
    image: "/images/Aure_br03.jpeg",
    category: "Bracelets",
    description:
      "An architectural, nail-inspired bangle in 18k gold vermeil with a modern open silhouette.",
  },
  {
    title: "Diamond Charm Bracelet",
    price: 65,
    image: "/images/Aure_br04.jpeg",
    category: "Bracelets",
    description:
      "A dainty 18k gold vermeil chain bracelet featuring a delicate diamond-shaped charm.",
  },
  {
    title: "Charm Drop Bracelet",
    price: 85,
    image: "/images/Aure_br05.jpeg",
    category: "Bracelets",
    description:
      "A delicate 18k gold vermeil chain bracelet adorned with multiple dangling charm drops.",
  },
  {
    title: "Tennis Bracelet",
    price: 145,
    image: "/images/Aure_br06.jpeg",
    category: "Bracelets",
    description:
      "A timeless 18k gold vermeil tennis bracelet lined with brilliant round cubic zirconia stones.",
  },
  {
    title: "Curb Chain Bracelet",
    price: 78,
    image: "/images/Aure_br07.jpeg",
    category: "Bracelets",
    description:
      "A bold curb-link chain bracelet in 18k gold vermeil with a polished, substantial feel.",
  },
  {
    title: "Classic Stud Earrings",
    price: 59,
    image: "/images/Aure_er01.jpeg",
    category: "Earrings",
    description:
      "Timeless 18k gold vermeil solitaire stud earrings that pair with anything.",
  },
  {
    title: "Classic Gold Hoops",
    price: 55,
    image: "/images/Aure_er02.jpeg",
    category: "Earrings",
    description:
      "Simple, versatile 18k gold vermeil hoop earrings for everyday wear.",
  },
  {
    title: "Pavé Huggie Hoops",
    price: 68,
    image: "/images/Aure_er03.jpeg",
    category: "Earrings",
    description:
      "Small 18k gold vermeil huggie hoops fully lined with sparkling pavé stones.",
  },
  {
    title: "Teardrop Earrings",
    price: 78,
    image: "/images/Aure_er04.jpeg",
    category: "Earrings",
    description:
      "Elegant 18k gold vermeil drop earrings featuring a pear-cut stone beneath a smaller accent.",
  },
  {
    title: "Daisy Stud Earrings",
    price: 48,
    image: "/images/Aure_er05.jpeg",
    category: "Earrings",
    description: "Playful flower-shaped studs in polished 18k gold vermeil.",
  },
  {
    title: "Crescent Moon Studs",
    price: 52,
    image: "/images/Aure_er06.jpeg",
    category: "Earrings",
    description:
      "Minimalist crescent moon studs in 18k gold vermeil with a smooth polished finish.",
  },
  {
    title: "Baguette Drop Hoops",
    price: 82,
    image: "/images/Aure_er07.jpeg",
    category: "Earrings",
    description:
      "18k gold vermeil huggie hoops finished with a dangling baguette-cut stone.",
  },
  {
    title: "Oval Halo Pendant",
    price: 96,
    image: "/images/Aure_n01.jpeg",
    category: "Necklaces",
    description:
      "An elegant 18k gold vermeil oval pendant fully paved with sparkling stones.",
  },
  {
    title: "Triple Drop Necklace",
    price: 89,
    image: "/images/Aure_n02.jpeg",
    category: "Necklaces",
    description:
      "A graceful 18k gold vermeil pendant necklace featuring a cascading trio of stones.",
  },
  {
    title: "Teardrop Necklace",
    price: 95,
    image: "/images/Aure_n03.jpeg",
    category: "Necklaces",
    description:
      "A refined 18k gold vermeil pendant necklace with a single graceful teardrop drop.",
  },
  {
    title: "North Star Necklace",
    price: 88,
    image: "/images/Aure_n04.jpeg",
    category: "Necklaces",
    description:
      "A radiant 18k gold vermeil star pendant necklace, pavé-set for extra sparkle.",
  },
  {
    title: "Layered Moon Necklace",
    price: 92,
    image: "/images/Aure_n05.jpeg",
    category: "Necklaces",
    description:
      "A double-layered 18k gold vermeil necklace featuring dainty crescent moon charms.",
  },
  {
    title: "Tennis Chain Necklace",
    price: 155,
    image: "/images/Aure_n06.jpeg",
    category: "Necklaces",
    description:
      "A dazzling 18k gold vermeil tennis-style necklace lined edge to edge with stones.",
  },
  {
    title: "Open Teardrop Necklace",
    price: 98,
    image: "/images/Aure_n07.jpeg",
    category: "Necklaces",
    description:
      "A sculptural 18k gold vermeil open teardrop pendant set with a single stone.",
  },
  {
    title: "Solitaire Engagement Ring",
    price: 129,
    image: "/images/Aure_r01.jpeg",
    category: "Rings",
    description:
      "A classic 18k gold vermeil solitaire ring featuring a brilliant round center stone.",
  },
  {
    title: "Pavé Duo Rings",
    price: 118,
    image: "/images/Aure_r02.jpeg",
    category: "Rings",
    description:
      "A stacked pair of 18k gold vermeil pavé bands, brilliant with round-cut stones.",
  },
  {
    title: "Infinity Twist Ring",
    price: 68,
    image: "/images/Aure_r03.jpeg",
    category: "Rings",
    description:
      "A graceful 18k gold vermeil crossover band lined with a row of sparkling stones.",
  },
  {
    title: "Classic Gold Band",
    price: 48,
    image: "/images/Aure_r04.jpeg",
    category: "Rings",
    description: "A simple, timeless polished 18k gold vermeil band.",
  },
  {
    title: "Moon & Star Open Ring",
    price: 58,
    image: "/images/Aure_r05.jpeg",
    category: "Rings",
    description:
      "An 18k gold vermeil open-cuff ring featuring a celestial moon and star motif.",
  },
  {
    title: "Eternity Ring",
    price: 135,
    image: "/images/Aure_r06.jpeg",
    category: "Rings",
    description:
      "A dazzling 18k gold vermeil eternity band fully lined with round stones.",
  },
  {
    title: "Wrapped Nail Ring",
    price: 72,
    image: "/images/Aure_r07.jpeg",
    category: "Rings",
    description:
      "A sculptural 18k gold vermeil ring inspired by a bent nail, finished with accent stones.",
  },
  {
    title: "Fluid Wave Ring",
    price: 62,
    image: "/images/Aure_r08.jpeg",
    category: "Rings",
    description:
      "A sculptural, fluid 18k gold vermeil ring with an organic wave-like twist.",
  },
  {
    title: "Wishbone Pavé Ring",
    price: 58,
    image: "/images/Aure_r09.jpeg",
    category: "Rings",
    description:
      "A delicate 18k gold vermeil V-shaped band pavé-set with sparkling stones.",
  },
];

async function main() {
  console.log("Seeding database...");

  for (const product of products) {
    await prisma.product.create({ data: product });
  }

  console.log(`Seeded ${products.length} products successfully.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
