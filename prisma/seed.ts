import { PrismaClient, Role, OrderStatus } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Clean existing data
  await prisma.wishlist.deleteMany()
  await prisma.cartItem.deleteMany()
  await prisma.review.deleteMany()
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()
  await prisma.address.deleteMany()
  await prisma.session.deleteMany()
  await prisma.account.deleteMany()
  await prisma.verificationToken.deleteMany()
  await prisma.user.deleteMany()

  // Create users
  const hashedPassword = await bcrypt.hash('password123', 12)

  const admin = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@wirstore.com',
      password: hashedPassword,
      role: Role.ADMIN,
      image: 'https://picsum.photos/seed/admin/200/200',
    },
  })

  const customer1 = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'customer@wirstore.com',
      password: hashedPassword,
      role: Role.CUSTOMER,
      image: 'https://picsum.photos/seed/customer1/200/200',
    },
  })

  const customer2 = await prisma.user.create({
    data: {
      name: 'Jane Smith',
      email: 'jane@wirstore.com',
      password: hashedPassword,
      role: Role.CUSTOMER,
      image: 'https://picsum.photos/seed/customer2/200/200',
    },
  })

  console.log('✅ Users created')

  // Create addresses
  await prisma.address.createMany({
    data: [
      { userId: customer1.id, name: 'Home', street: '123 Main St', city: 'New York', state: 'NY', zip: '10001', country: 'US', isDefault: true },
      { userId: customer1.id, name: 'Office', street: '456 Business Ave', city: 'New York', state: 'NY', zip: '10002', country: 'US', isDefault: false },
      { userId: customer2.id, name: 'Home', street: '789 Oak Lane', city: 'Los Angeles', state: 'CA', zip: '90001', country: 'US', isDefault: true },
    ],
  })

  console.log('✅ Addresses created')

  // Create categories
  const categories = await Promise.all([
    prisma.category.create({
      data: { name: 'Electronics', slug: 'electronics', image: 'https://picsum.photos/seed/electronics/600/400', description: 'Latest gadgets and tech accessories' },
    }),
    prisma.category.create({
      data: { name: 'Clothing', slug: 'clothing', image: 'https://picsum.photos/seed/clothing/600/400', description: 'Premium fashion and apparel' },
    }),
    prisma.category.create({
      data: { name: 'Accessories', slug: 'accessories', image: 'https://picsum.photos/seed/accessories/600/400', description: 'Watches, bags, and more' },
    }),
    prisma.category.create({
      data: { name: 'Home & Living', slug: 'home-living', image: 'https://picsum.photos/seed/home/600/400', description: 'Furniture and home decor' },
    }),
    prisma.category.create({
      data: { name: 'Sports', slug: 'sports', image: 'https://picsum.photos/seed/sports/600/400', description: 'Athletic gear and equipment' },
    }),
    prisma.category.create({
      data: { name: 'Books', slug: 'books', image: 'https://picsum.photos/seed/books/600/400', description: 'Bestsellers and new releases' },
    }),
  ])

  const [electronics, clothing, accessories, home, sports, books] = categories
  console.log('✅ Categories created')

  // Create products
  const products = await Promise.all([
    // Electronics (6 products)
    prisma.product.create({
      data: {
        name: 'Wireless Noise-Cancelling Headphones',
        slug: 'wireless-noise-cancelling-headphones',
        description: 'Premium over-ear headphones with active noise cancellation, 30-hour battery life, and Hi-Res audio support. Features adaptive sound control and speak-to-chat technology.',
        price: 299.99,
        comparePrice: 349.99,
        images: ['https://picsum.photos/seed/headphones1/800/800', 'https://picsum.photos/seed/headphones2/800/800', 'https://picsum.photos/seed/headphones3/800/800'],
        categoryId: electronics.id,
        tags: ['wireless', 'noise-cancelling', 'premium', 'audio'],
        stock: 50,
        rating: 4.8,
        reviewCount: 124,
        featured: true,
        sizes: [],
        colors: ['Black', 'Silver', 'Midnight Blue'],
        specifications: { driver: '40mm', frequency: '4Hz-40kHz', battery: '30 hours', weight: '254g', connectivity: 'Bluetooth 5.2' },
      },
    }),
    prisma.product.create({
      data: {
        name: 'Ultra-Slim Laptop 15 Pro',
        slug: 'ultra-slim-laptop-15-pro',
        description: 'Powerful ultrabook with M3 chip, 16GB RAM, 512GB SSD, and stunning 15.3-inch Liquid Retina display. Perfect for professionals and creatives.',
        price: 1999.99,
        comparePrice: 2199.99,
        images: ['https://picsum.photos/seed/laptop1/800/800', 'https://picsum.photos/seed/laptop2/800/800'],
        categoryId: electronics.id,
        tags: ['laptop', 'ultrabook', 'professional'],
        stock: 25,
        rating: 4.9,
        reviewCount: 89,
        featured: true,
        sizes: [],
        colors: ['Space Gray', 'Silver'],
        specifications: { processor: 'M3 Pro', ram: '16GB', storage: '512GB SSD', display: '15.3" Liquid Retina', battery: '22 hours' },
      },
    }),
    prisma.product.create({
      data: {
        name: 'Smart Watch Series X',
        slug: 'smart-watch-series-x',
        description: 'Advanced smartwatch with health monitoring, GPS, always-on display, and 7-day battery life. Water resistant to 50m.',
        price: 449.99,
        comparePrice: 499.99,
        images: ['https://picsum.photos/seed/watch1/800/800', 'https://picsum.photos/seed/watch2/800/800'],
        categoryId: electronics.id,
        tags: ['smartwatch', 'fitness', 'health'],
        stock: 75,
        rating: 4.6,
        reviewCount: 203,
        featured: false,
        sizes: ['40mm', '44mm'],
        colors: ['Midnight', 'Starlight', 'Red'],
        specifications: { display: 'AMOLED 1.9"', battery: '7 days', waterResistance: '50m', sensors: 'Heart rate, SpO2, ECG' },
      },
    }),
    prisma.product.create({
      data: {
        name: '4K Wireless Earbuds Pro',
        slug: '4k-wireless-earbuds-pro',
        description: 'True wireless earbuds with spatial audio, adaptive transparency, and personalized spatial audio with dynamic head tracking.',
        price: 179.99,
        comparePrice: 249.99,
        images: ['https://picsum.photos/seed/earbuds1/800/800', 'https://picsum.photos/seed/earbuds2/800/800'],
        categoryId: electronics.id,
        tags: ['earbuds', 'wireless', 'audio'],
        stock: 120,
        rating: 4.7,
        reviewCount: 312,
        featured: true,
        sizes: [],
        colors: ['White', 'Black'],
        specifications: { driver: '11mm', battery: '6h (30h with case)', connectivity: 'Bluetooth 5.3', anc: 'Adaptive' },
      },
    }),
    prisma.product.create({
      data: {
        name: 'Portable Bluetooth Speaker',
        slug: 'portable-bluetooth-speaker',
        description: 'Waterproof portable speaker with 360° sound, 20-hour battery, and built-in power bank. Perfect for outdoor adventures.',
        price: 129.99,
        comparePrice: null,
        images: ['https://picsum.photos/seed/speaker1/800/800', 'https://picsum.photos/seed/speaker2/800/800'],
        categoryId: electronics.id,
        tags: ['speaker', 'bluetooth', 'portable', 'waterproof'],
        stock: 90,
        rating: 4.5,
        reviewCount: 178,
        featured: false,
        sizes: [],
        colors: ['Black', 'Blue', 'Red', 'Green'],
        specifications: { power: '30W', battery: '20 hours', waterproof: 'IP67', weight: '710g' },
      },
    }),
    prisma.product.create({
      data: {
        name: 'Mechanical Gaming Keyboard',
        slug: 'mechanical-gaming-keyboard',
        description: 'RGB mechanical keyboard with hot-swappable switches, aluminum frame, and programmable macros. Built for competitive gaming.',
        price: 159.99,
        comparePrice: 189.99,
        images: ['https://picsum.photos/seed/keyboard1/800/800', 'https://picsum.photos/seed/keyboard2/800/800'],
        categoryId: electronics.id,
        tags: ['keyboard', 'gaming', 'mechanical', 'rgb'],
        stock: 60,
        rating: 4.4,
        reviewCount: 95,
        featured: false,
        sizes: [],
        colors: ['Black', 'White'],
        specifications: { switches: 'Cherry MX Red', layout: 'Full-size', backlight: 'Per-key RGB', connectivity: 'USB-C / Wireless' },
      },
    }),

    // Clothing (6 products)
    prisma.product.create({
      data: {
        name: 'Premium Cotton Crew Neck Tee',
        slug: 'premium-cotton-crew-neck-tee',
        description: 'Ultra-soft 100% organic cotton t-shirt with a relaxed fit. Pre-shrunk and garment-dyed for a vintage feel.',
        price: 39.99,
        comparePrice: 49.99,
        images: ['https://picsum.photos/seed/tshirt1/800/800', 'https://picsum.photos/seed/tshirt2/800/800'],
        categoryId: clothing.id,
        tags: ['cotton', 'casual', 'organic'],
        stock: 200,
        rating: 4.3,
        reviewCount: 456,
        featured: false,
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        colors: ['White', 'Black', 'Navy', 'Olive', 'Burgundy'],
        specifications: { material: '100% Organic Cotton', fit: 'Relaxed', care: 'Machine wash cold' },
      },
    }),
    prisma.product.create({
      data: {
        name: 'Slim Fit Chino Pants',
        slug: 'slim-fit-chino-pants',
        description: 'Modern slim-fit chinos crafted from stretch cotton twill. Versatile enough for office or weekend wear.',
        price: 79.99,
        comparePrice: 99.99,
        images: ['https://picsum.photos/seed/chinos1/800/800', 'https://picsum.photos/seed/chinos2/800/800'],
        categoryId: clothing.id,
        tags: ['pants', 'chinos', 'slim-fit'],
        stock: 150,
        rating: 4.5,
        reviewCount: 234,
        featured: true,
        sizes: ['28', '30', '32', '34', '36', '38'],
        colors: ['Khaki', 'Navy', 'Black', 'Olive'],
        specifications: { material: '98% Cotton, 2% Elastane', fit: 'Slim', rise: 'Mid-rise' },
      },
    }),
    prisma.product.create({
      data: {
        name: 'Wool Blend Overcoat',
        slug: 'wool-blend-overcoat',
        description: 'Luxurious wool-blend overcoat with a tailored silhouette. Features notch lapels, two-button closure, and satin lining.',
        price: 299.99,
        comparePrice: 399.99,
        images: ['https://picsum.photos/seed/overcoat1/800/800', 'https://picsum.photos/seed/overcoat2/800/800'],
        categoryId: clothing.id,
        tags: ['coat', 'wool', 'luxury', 'winter'],
        stock: 30,
        rating: 4.8,
        reviewCount: 67,
        featured: true,
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Charcoal', 'Camel', 'Navy'],
        specifications: { material: '70% Wool, 30% Polyester', lining: 'Satin', closure: 'Two-button' },
      },
    }),
    prisma.product.create({
      data: {
        name: 'Denim Jacket Classic',
        slug: 'denim-jacket-classic',
        description: 'Timeless denim jacket in a medium wash. Features button closure, chest pockets, and adjustable waist tabs.',
        price: 119.99,
        comparePrice: null,
        images: ['https://picsum.photos/seed/denim1/800/800', 'https://picsum.photos/seed/denim2/800/800'],
        categoryId: clothing.id,
        tags: ['denim', 'jacket', 'casual'],
        stock: 80,
        rating: 4.4,
        reviewCount: 189,
        featured: false,
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Medium Wash', 'Dark Wash', 'Light Wash'],
        specifications: { material: '100% Cotton Denim', weight: '12oz', closure: 'Button-front' },
      },
    }),
    prisma.product.create({
      data: {
        name: 'Performance Running Shorts',
        slug: 'performance-running-shorts',
        description: 'Lightweight running shorts with built-in liner, moisture-wicking fabric, and zippered pocket. Reflective details for visibility.',
        price: 49.99,
        comparePrice: null,
        images: ['https://picsum.photos/seed/shorts1/800/800', 'https://picsum.photos/seed/shorts2/800/800'],
        categoryId: clothing.id,
        tags: ['shorts', 'running', 'athletic'],
        stock: 180,
        rating: 4.6,
        reviewCount: 312,
        featured: false,
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'Navy', 'Gray'],
        specifications: { material: '92% Polyester, 8% Spandex', inseam: '7"', features: 'Built-in liner, Zippered pocket' },
      },
    }),

    // Accessories (5 products)
    prisma.product.create({
      data: {
        name: 'Leather Minimalist Wallet',
        slug: 'leather-minimalist-wallet',
        description: 'Handcrafted full-grain leather wallet with RFID blocking. Slim profile holds up to 8 cards and cash.',
        price: 69.99,
        comparePrice: 89.99,
        images: ['https://picsum.photos/seed/wallet1/800/800', 'https://picsum.photos/seed/wallet2/800/800'],
        categoryId: accessories.id,
        tags: ['wallet', 'leather', 'minimalist', 'rfid'],
        stock: 100,
        rating: 4.7,
        reviewCount: 278,
        featured: true,
        sizes: [],
        colors: ['Brown', 'Black', 'Tan'],
        specifications: { material: 'Full-grain Leather', capacity: '8 cards + cash', rfid: 'Yes', dimensions: '4.3" x 3.0" x 0.4"' },
      },
    }),
    prisma.product.create({
      data: {
        name: 'Aviator Sunglasses',
        slug: 'aviator-sunglasses',
        description: 'Classic aviator sunglasses with polarized lenses and titanium frame. 100% UV protection.',
        price: 159.99,
        comparePrice: 199.99,
        images: ['https://picsum.photos/seed/sunglasses1/800/800', 'https://picsum.photos/seed/sunglasses2/800/800'],
        categoryId: accessories.id,
        tags: ['sunglasses', 'aviator', 'polarized'],
        stock: 70,
        rating: 4.5,
        reviewCount: 156,
        featured: false,
        sizes: [],
        colors: ['Gold/Green', 'Silver/Blue', 'Black/Gray'],
        specifications: { frame: 'Titanium', lenses: 'Polarized CR-39', uv: '100% UV400', weight: '28g' },
      },
    }),
    prisma.product.create({
      data: {
        name: 'Canvas Weekender Bag',
        slug: 'canvas-weekender-bag',
        description: 'Durable waxed canvas weekender with leather trim. Features padded laptop sleeve and shoe compartment.',
        price: 149.99,
        comparePrice: null,
        images: ['https://picsum.photos/seed/bag1/800/800', 'https://picsum.photos/seed/bag2/800/800'],
        categoryId: accessories.id,
        tags: ['bag', 'weekender', 'canvas', 'travel'],
        stock: 45,
        rating: 4.6,
        reviewCount: 89,
        featured: false,
        sizes: [],
        colors: ['Olive', 'Navy', 'Charcoal'],
        specifications: { material: 'Waxed Canvas + Leather', capacity: '40L', laptop: 'Up to 15"', dimensions: '22" x 12" x 10"' },
      },
    }),
    prisma.product.create({
      data: {
        name: 'Automatic Chronograph Watch',
        slug: 'automatic-chronograph-watch',
        description: 'Swiss-made automatic chronograph with sapphire crystal, 100m water resistance, and exhibition caseback.',
        price: 899.99,
        comparePrice: 1199.99,
        images: ['https://picsum.photos/seed/chronowatch1/800/800', 'https://picsum.photos/seed/chronowatch2/800/800'],
        categoryId: accessories.id,
        tags: ['watch', 'automatic', 'luxury', 'chronograph'],
        stock: 15,
        rating: 4.9,
        reviewCount: 42,
        featured: true,
        sizes: [],
        colors: ['Silver/Black', 'Gold/White', 'Rose Gold/Blue'],
        specifications: { movement: 'Swiss Automatic', crystal: 'Sapphire', waterResistance: '100m', caseDiameter: '42mm' },
      },
    }),
    prisma.product.create({
      data: {
        name: 'Silk Pocket Square Set',
        slug: 'silk-pocket-square-set',
        description: 'Set of 5 premium silk pocket squares in complementary patterns. Hand-rolled edges for a refined finish.',
        price: 59.99,
        comparePrice: 79.99,
        images: ['https://picsum.photos/seed/pocketsquare1/800/800', 'https://picsum.photos/seed/pocketsquare2/800/800'],
        categoryId: accessories.id,
        tags: ['pocket-square', 'silk', 'formal', 'set'],
        stock: 55,
        rating: 4.3,
        reviewCount: 34,
        featured: false,
        sizes: [],
        colors: ['Classic Collection', 'Modern Collection'],
        specifications: { material: '100% Mulberry Silk', quantity: '5 pieces', size: '13" x 13"', edges: 'Hand-rolled' },
      },
    }),

    // Home & Living (5 products)
    prisma.product.create({
      data: {
        name: 'Scandinavian Floor Lamp',
        slug: 'scandinavian-floor-lamp',
        description: 'Minimalist floor lamp with adjustable arm and warm LED light. Solid oak base with matte black metal shade.',
        price: 189.99,
        comparePrice: 229.99,
        images: ['https://picsum.photos/seed/lamp1/800/800', 'https://picsum.photos/seed/lamp2/800/800'],
        categoryId: home.id,
        tags: ['lamp', 'scandinavian', 'minimalist', 'led'],
        stock: 35,
        rating: 4.7,
        reviewCount: 78,
        featured: true,
        sizes: [],
        colors: ['Black/Oak', 'White/Oak'],
        specifications: { height: '60"', bulb: 'LED E26 (included)', material: 'Oak + Metal', wattage: '12W' },
      },
    }),
    prisma.product.create({
      data: {
        name: 'Handwoven Throw Blanket',
        slug: 'handwoven-throw-blanket',
        description: 'Luxuriously soft handwoven throw blanket made from New Zealand wool. Perfect for cozy evenings.',
        price: 129.99,
        comparePrice: null,
        images: ['https://picsum.photos/seed/blanket1/800/800', 'https://picsum.photos/seed/blanket2/800/800'],
        categoryId: home.id,
        tags: ['blanket', 'wool', 'handwoven', 'cozy'],
        stock: 40,
        rating: 4.8,
        reviewCount: 112,
        featured: false,
        sizes: [],
        colors: ['Cream', 'Gray', 'Terracotta'],
        specifications: { material: 'New Zealand Wool', size: '50" x 70"', care: 'Dry clean only', weight: '2.5 lbs' },
      },
    }),
    prisma.product.create({
      data: {
        name: 'Ceramic Planter Set',
        slug: 'ceramic-planter-set',
        description: 'Set of 3 handmade ceramic planters with drainage holes and bamboo saucers. Matte glaze finish.',
        price: 79.99,
        comparePrice: 99.99,
        images: ['https://picsum.photos/seed/planter1/800/800', 'https://picsum.photos/seed/planter2/800/800'],
        categoryId: home.id,
        tags: ['planter', 'ceramic', 'handmade', 'set'],
        stock: 60,
        rating: 4.5,
        reviewCount: 67,
        featured: false,
        sizes: ['Small (4")', 'Medium (6")', 'Large (8")'],
        colors: ['White', 'Sage', 'Terracotta'],
        specifications: { material: 'Stoneware Ceramic', drainage: 'Yes', saucer: 'Bamboo (included)', quantity: '3 pieces' },
      },
    }),
    prisma.product.create({
      data: {
        name: 'Memory Foam Pillow',
        slug: 'memory-foam-pillow',
        description: 'Ergonomic memory foam pillow with cooling gel layer. Adjustable loft with removable fill. Hypoallergenic cover.',
        price: 89.99,
        comparePrice: 119.99,
        images: ['https://picsum.photos/seed/pillow1/800/800', 'https://picsum.photos/seed/pillow2/800/800'],
        categoryId: home.id,
        tags: ['pillow', 'memory-foam', 'ergonomic', 'cooling'],
        stock: 95,
        rating: 4.6,
        reviewCount: 234,
        featured: false,
        sizes: ['Standard', 'Queen', 'King'],
        colors: ['White'],
        specifications: { fill: 'Shredded Memory Foam + Gel', cover: 'Bamboo-derived Rayon', adjustable: 'Yes', certifications: 'CertiPUR-US' },
      },
    }),
    prisma.product.create({
      data: {
        name: 'Espresso Machine Deluxe',
        slug: 'espresso-machine-deluxe',
        description: 'Professional-grade espresso machine with 15-bar pressure, built-in grinder, and milk frother. Makes cafe-quality drinks at home.',
        price: 599.99,
        comparePrice: 749.99,
        images: ['https://picsum.photos/seed/espresso1/800/800', 'https://picsum.photos/seed/espresso2/800/800'],
        categoryId: home.id,
        tags: ['espresso', 'coffee', 'kitchen', 'premium'],
        stock: 20,
        rating: 4.8,
        reviewCount: 156,
        featured: true,
        sizes: [],
        colors: ['Stainless Steel', 'Matte Black'],
        specifications: { pressure: '15 bar', grinder: 'Built-in Conical Burr', waterTank: '2L', boiler: 'Thermoblock' },
      },
    }),

    // Sports (4 products)
    prisma.product.create({
      data: {
        name: 'Carbon Fiber Tennis Racket',
        slug: 'carbon-fiber-tennis-racket',
        description: 'Tournament-grade tennis racket with carbon fiber frame, vibration dampening system, and optimal sweet spot.',
        price: 249.99,
        comparePrice: 299.99,
        images: ['https://picsum.photos/seed/tennis1/800/800', 'https://picsum.photos/seed/tennis2/800/800'],
        categoryId: sports.id,
        tags: ['tennis', 'racket', 'carbon-fiber', 'professional'],
        stock: 40,
        rating: 4.6,
        reviewCount: 89,
        featured: false,
        sizes: ['4 1/4"', '4 3/8"', '4 1/2"'],
        colors: ['Black/Red', 'Blue/White'],
        specifications: { frame: 'Carbon Fiber', weight: '300g', headSize: '100 sq in', stringPattern: '16x19' },
      },
    }),
    prisma.product.create({
      data: {
        name: 'Yoga Mat Premium',
        slug: 'yoga-mat-premium',
        description: 'Extra-thick 6mm yoga mat with alignment lines. Non-slip natural rubber base with microfiber suede top.',
        price: 79.99,
        comparePrice: null,
        images: ['https://picsum.photos/seed/yoga1/800/800', 'https://picsum.photos/seed/yoga2/800/800'],
        categoryId: sports.id,
        tags: ['yoga', 'mat', 'fitness', 'eco-friendly'],
        stock: 110,
        rating: 4.7,
        reviewCount: 345,
        featured: true,
        sizes: [],
        colors: ['Midnight Blue', 'Forest Green', 'Dusty Rose'],
        specifications: { thickness: '6mm', material: 'Natural Rubber + Microfiber', size: '72" x 26"', weight: '5.5 lbs' },
      },
    }),
    prisma.product.create({
      data: {
        name: 'Adjustable Dumbbell Set',
        slug: 'adjustable-dumbbell-set',
        description: 'Space-saving adjustable dumbbells from 5-52.5 lbs each. Quick-change weight selection with dial system.',
        price: 349.99,
        comparePrice: 449.99,
        images: ['https://picsum.photos/seed/dumbbell1/800/800', 'https://picsum.photos/seed/dumbbell2/800/800'],
        categoryId: sports.id,
        tags: ['dumbbell', 'weights', 'home-gym', 'adjustable'],
        stock: 25,
        rating: 4.8,
        reviewCount: 167,
        featured: false,
        sizes: [],
        colors: ['Black/Red'],
        specifications: { weightRange: '5-52.5 lbs each', adjustment: 'Dial system', material: 'Steel + Rubber', includes: '2 dumbbells + stand' },
      },
    }),
    prisma.product.create({
      data: {
        name: 'Trail Running Shoes',
        slug: 'trail-running-shoes',
        description: 'All-terrain trail running shoes with Vibram outsole, Gore-Tex waterproof membrane, and responsive cushioning.',
        price: 169.99,
        comparePrice: 199.99,
        images: ['https://picsum.photos/seed/trailshoes1/800/800', 'https://picsum.photos/seed/trailshoes2/800/800'],
        categoryId: sports.id,
        tags: ['shoes', 'trail-running', 'waterproof', 'outdoor'],
        stock: 65,
        rating: 4.5,
        reviewCount: 198,
        featured: false,
        sizes: ['7', '8', '9', '10', '11', '12', '13'],
        colors: ['Black/Orange', 'Gray/Blue', 'Green/Black'],
        specifications: { outsole: 'Vibram Megagrip', upper: 'Gore-Tex', drop: '8mm', weight: '310g' },
      },
    }),

    // Books (4 products)
    prisma.product.create({
      data: {
        name: 'The Art of Clean Code',
        slug: 'the-art-of-clean-code',
        description: 'A comprehensive guide to writing maintainable, elegant code. Covers design patterns, refactoring techniques, and best practices for modern software development.',
        price: 34.99,
        comparePrice: 44.99,
        images: ['https://picsum.photos/seed/codebook1/800/800', 'https://picsum.photos/seed/codebook2/800/800'],
        categoryId: books.id,
        tags: ['programming', 'software', 'clean-code', 'bestseller'],
        stock: 200,
        rating: 4.9,
        reviewCount: 567,
        featured: true,
        sizes: [],
        colors: ['Hardcover', 'Paperback'],
        specifications: { pages: '432', publisher: 'Tech Press', isbn: '978-0-13-235088-4', language: 'English' },
      },
    }),
    prisma.product.create({
      data: {
        name: 'Design Systems Handbook',
        slug: 'design-systems-handbook',
        description: 'Everything you need to know about building and maintaining design systems. From tokens to components to documentation.',
        price: 29.99,
        comparePrice: null,
        images: ['https://picsum.photos/seed/designbook1/800/800', 'https://picsum.photos/seed/designbook2/800/800'],
        categoryId: books.id,
        tags: ['design', 'ui', 'systems', 'handbook'],
        stock: 150,
        rating: 4.6,
        reviewCount: 234,
        featured: false,
        sizes: [],
        colors: ['Hardcover', 'Paperback'],
        specifications: { pages: '356', publisher: 'Design Co', isbn: '978-0-13-235089-1', language: 'English' },
      },
    }),
    prisma.product.create({
      data: {
        name: 'Mindful Leadership',
        slug: 'mindful-leadership',
        description: 'Transform your leadership style with mindfulness practices. Learn to lead with clarity, compassion, and purpose in the modern workplace.',
        price: 24.99,
        comparePrice: 29.99,
        images: ['https://picsum.photos/seed/leaderbook1/800/800', 'https://picsum.photos/seed/leaderbook2/800/800'],
        categoryId: books.id,
        tags: ['leadership', 'mindfulness', 'business', 'self-help'],
        stock: 180,
        rating: 4.4,
        reviewCount: 189,
        featured: false,
        sizes: [],
        colors: ['Hardcover', 'Paperback', 'Audiobook'],
        specifications: { pages: '288', publisher: 'Wisdom Press', isbn: '978-0-13-235090-7', language: 'English' },
      },
    }),
    prisma.product.create({
      data: {
        name: 'The Future of AI',
        slug: 'the-future-of-ai',
        description: 'An exploration of artificial intelligence and its impact on society, work, and human potential. Written by leading AI researchers.',
        price: 39.99,
        comparePrice: 49.99,
        images: ['https://picsum.photos/seed/aibook1/800/800', 'https://picsum.photos/seed/aibook2/800/800'],
        categoryId: books.id,
        tags: ['ai', 'technology', 'future', 'science'],
        stock: 130,
        rating: 4.7,
        reviewCount: 312,
        featured: true,
        sizes: [],
        colors: ['Hardcover', 'Paperback'],
        specifications: { pages: '512', publisher: 'Future Press', isbn: '978-0-13-235091-4', language: 'English' },
      },
    }),
  ])

  console.log(`✅ ${products.length} products created`)

  // Create orders
  const orders = await Promise.all([
    prisma.order.create({
      data: {
        userId: customer1.id,
        status: OrderStatus.DELIVERED,
        total: 479.98,
        shippingAddress: { name: 'John Doe', street: '123 Main St', city: 'New York', state: 'NY', zip: '10001', country: 'US' },
        paymentId: 'pi_demo_001',
        items: {
          create: [
            { productId: products[0].id, quantity: 1, price: 299.99, color: 'Black' },
            { productId: products[3].id, quantity: 1, price: 179.99, color: 'White' },
          ],
        },
      },
    }),
    prisma.order.create({
      data: {
        userId: customer1.id,
        status: OrderStatus.SHIPPED,
        total: 299.99,
        shippingAddress: { name: 'John Doe', street: '123 Main St', city: 'New York', state: 'NY', zip: '10001', country: 'US' },
        paymentId: 'pi_demo_002',
        items: {
          create: [
            { productId: products[8].id, quantity: 1, price: 299.99, size: 'L', color: 'Charcoal' },
          ],
        },
      },
    }),
    prisma.order.create({
      data: {
        userId: customer1.id,
        status: OrderStatus.PROCESSING,
        total: 159.98,
        shippingAddress: { name: 'John Doe', street: '456 Business Ave', city: 'New York', state: 'NY', zip: '10002', country: 'US' },
        paymentId: 'pi_demo_003',
        items: {
          create: [
            { productId: products[6].id, quantity: 2, price: 39.99, size: 'M', color: 'White' },
            { productId: products[7].id, quantity: 1, price: 79.99, size: '32', color: 'Navy' },
          ],
        },
      },
    }),
    prisma.order.create({
      data: {
        userId: customer2.id,
        status: OrderStatus.DELIVERED,
        total: 899.99,
        shippingAddress: { name: 'Jane Smith', street: '789 Oak Lane', city: 'Los Angeles', state: 'CA', zip: '90001', country: 'US' },
        paymentId: 'pi_demo_004',
        items: {
          create: [
            { productId: products[15].id, quantity: 1, price: 899.99, color: 'Silver/Black' },
          ],
        },
      },
    }),
    prisma.order.create({
      data: {
        userId: customer2.id,
        status: OrderStatus.PENDING,
        total: 269.98,
        shippingAddress: { name: 'Jane Smith', street: '789 Oak Lane', city: 'Los Angeles', state: 'CA', zip: '90001', country: 'US' },
        paymentId: 'pi_demo_005',
        items: {
          create: [
            { productId: products[4].id, quantity: 1, price: 129.99, color: 'Black' },
            { productId: products[12].id, quantity: 1, price: 69.99, color: 'Brown' },
          ],
        },
      },
    }),
    prisma.order.create({
      data: {
        userId: customer1.id,
        status: OrderStatus.CANCELLED,
        total: 1999.99,
        shippingAddress: { name: 'John Doe', street: '123 Main St', city: 'New York', state: 'NY', zip: '10001', country: 'US' },
        paymentId: 'pi_demo_006',
        items: {
          create: [
            { productId: products[1].id, quantity: 1, price: 1999.99, color: 'Space Gray' },
          ],
        },
      },
    }),
    prisma.order.create({
      data: {
        userId: customer2.id,
        status: OrderStatus.SHIPPED,
        total: 189.99,
        shippingAddress: { name: 'Jane Smith', street: '789 Oak Lane', city: 'Los Angeles', state: 'CA', zip: '90001', country: 'US' },
        paymentId: 'pi_demo_007',
        items: {
          create: [
            { productId: products[17].id, quantity: 1, price: 189.99, color: 'Black/Oak' },
          ],
        },
      },
    }),
    prisma.order.create({
      data: {
        userId: customer1.id,
        status: OrderStatus.DELIVERED,
        total: 114.98,
        shippingAddress: { name: 'John Doe', street: '123 Main St', city: 'New York', state: 'NY', zip: '10001', country: 'US' },
        paymentId: 'pi_demo_008',
        items: {
          create: [
            { productId: products[24].id, quantity: 1, price: 34.99, color: 'Hardcover' },
            { productId: products[23].id, quantity: 1, price: 79.99, color: 'Midnight Blue' },
          ],
        },
      },
    }),
    prisma.order.create({
      data: {
        userId: customer2.id,
        status: OrderStatus.PROCESSING,
        total: 449.99,
        shippingAddress: { name: 'Jane Smith', street: '789 Oak Lane', city: 'Los Angeles', state: 'CA', zip: '90001', country: 'US' },
        paymentId: 'pi_demo_009',
        items: {
          create: [
            { productId: products[2].id, quantity: 1, price: 449.99, size: '44mm', color: 'Midnight' },
          ],
        },
      },
    }),
    prisma.order.create({
      data: {
        userId: customer1.id,
        status: OrderStatus.DELIVERED,
        total: 349.99,
        shippingAddress: { name: 'John Doe', street: '123 Main St', city: 'New York', state: 'NY', zip: '10001', country: 'US' },
        paymentId: 'pi_demo_010',
        items: {
          create: [
            { productId: products[22].id, quantity: 1, price: 349.99, color: 'Black/Red' },
          ],
        },
      },
    }),
    prisma.order.create({
      data: {
        userId: customer2.id,
        status: OrderStatus.DELIVERED,
        total: 599.99,
        shippingAddress: { name: 'Jane Smith', street: '789 Oak Lane', city: 'Los Angeles', state: 'CA', zip: '90001', country: 'US' },
        paymentId: 'pi_demo_011',
        items: {
          create: [
            { productId: products[21].id, quantity: 1, price: 599.99, color: 'Stainless Steel' },
          ],
        },
      },
    }),
  ])

  console.log(`✅ ${orders.length} orders created`)

  // Create reviews
  const reviewsData = [
    { userId: customer1.id, productId: products[0].id, rating: 5, comment: 'Best headphones I\'ve ever owned. The noise cancellation is incredible and the sound quality is phenomenal.' },
    { userId: customer2.id, productId: products[0].id, rating: 4, comment: 'Great sound quality and comfortable for long listening sessions. Battery life is impressive.' },
    { userId: customer1.id, productId: products[1].id, rating: 5, comment: 'This laptop is a beast. Handles everything I throw at it with ease. The display is gorgeous.' },
    { userId: customer2.id, productId: products[1].id, rating: 5, comment: 'Perfect for my design work. Fast, beautiful screen, and the battery lasts all day.' },
    { userId: customer1.id, productId: products[2].id, rating: 4, comment: 'Love the health tracking features. The battery life is amazing compared to competitors.' },
    { userId: customer2.id, productId: products[3].id, rating: 5, comment: 'Spatial audio is a game changer. These earbuds are worth every penny.' },
    { userId: customer1.id, productId: products[6].id, rating: 4, comment: 'Super soft cotton, fits perfectly. Will definitely buy more colors.' },
    { userId: customer2.id, productId: products[7].id, rating: 5, comment: 'Best chinos I\'ve found. The stretch fabric is so comfortable for all-day wear.' },
    { userId: customer1.id, productId: products[8].id, rating: 5, comment: 'Stunning overcoat. The quality is exceptional and it fits like it was tailored for me.' },
    { userId: customer2.id, productId: products[12].id, rating: 5, comment: 'Beautiful wallet, great leather quality. Slim enough for front pocket carry.' },
    { userId: customer1.id, productId: products[15].id, rating: 5, comment: 'This watch is a work of art. The movement is mesmerizing through the exhibition caseback.' },
    { userId: customer2.id, productId: products[17].id, rating: 4, comment: 'Beautiful lamp, great quality. The adjustable arm is very useful.' },
    { userId: customer1.id, productId: products[18].id, rating: 5, comment: 'So cozy and warm. The wool quality is outstanding. Perfect for movie nights.' },
    { userId: customer2.id, productId: products[21].id, rating: 5, comment: 'Makes amazing espresso. The built-in grinder is a huge plus. Cafe quality at home!' },
    { userId: customer1.id, productId: products[23].id, rating: 5, comment: 'Best yoga mat I\'ve used. The alignment lines are helpful and it doesn\'t slip at all.' },
    { userId: customer2.id, productId: products[22].id, rating: 4, comment: 'Great racket for intermediate players. Good power and control balance.' },
    { userId: customer1.id, productId: products[24].id, rating: 5, comment: 'Essential reading for any developer. Changed how I think about code quality.' },
    { userId: customer2.id, productId: products[24].id, rating: 5, comment: 'Brilliant book. Practical advice that I apply daily in my work.' },
    { userId: customer1.id, productId: products[27].id, rating: 4, comment: 'Fascinating read about AI\'s potential. Well-researched and thought-provoking.' },
    { userId: customer2.id, productId: products[27].id, rating: 5, comment: 'A must-read for anyone interested in technology and its future impact on society.' },
    { userId: customer1.id, productId: products[4].id, rating: 4, comment: 'Great sound for the price. Battery lasts forever and it\'s truly waterproof.' },
    { userId: customer2.id, productId: products[5].id, rating: 5, comment: 'The switches feel amazing. RGB lighting is beautiful and the build quality is top-notch.' },
  ]

  await prisma.review.createMany({ data: reviewsData })
  console.log(`✅ ${reviewsData.length} reviews created`)

  // Create wishlists
  await prisma.wishlist.createMany({
    data: [
      { userId: customer1.id, productId: products[1].id },
      { userId: customer1.id, productId: products[15].id },
      { userId: customer1.id, productId: products[21].id },
      { userId: customer2.id, productId: products[0].id },
      { userId: customer2.id, productId: products[8].id },
    ],
  })

  console.log('✅ Wishlists created')
  console.log('🎉 Seeding complete!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
