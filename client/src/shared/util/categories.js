export const categories = [
    {
        id: 'a',
        name: 'House Chores',
        sub: [
            {
                id: 'a1',
                name: 'Home Cook',
                unit: '/menu set',
                label: 'Type of Service',
                option: ['Delivery', 'Cook at Home', 'Cooking Class', 'Asian', 'Western', 'Vegetarian', 'Pastry', 'Halal'],
            },
            {
                id: 'a2',
                name: 'Dishwashing',
                unit: '/hour',
                label: 'Gender',
                option: ['Wash at Home', 'Pick-Up Dishwashing'],
            },
            {
                id: 'a3',
                name: 'Trash Pick-Up',
                unit: '/kg',
                label: 'Type of Service',
                option: [
                    'Trash Pick-Up',
                    'Garbage Cleaning',
                    'Trash Collecting',
                    'Sorting Trash',
                    'Organic Waste',
                    'Inorganic Waste',
                    'Recyclable Waste',
                    'Electronic Waste',
                    'Furnitures Waste',
                    'Paper Waste',
                ],
            },
            {
                id: 'a4',
                name: 'Laundry',
                unit: '/kg',
                label: 'Laundry Service',
                option: ['Laundry', 'Ironing', 'Dry Clean', 'Shoe Laundry', 'Bag Laundry', 'Doll Laundry', 'Pillow Laundry'],
            },
            {
                id: 'a5',
                name: 'Delivery',
                unit: '/delivery',
                label: 'Delivery Item',
                option: ['Cooking Gas', 'Drinking Water Gallon'],
            },
        ],
    },
    {
        id: 'b',
        name: 'House Cleaning & Organizing',
        sub: [
            {
                id: 'b1',
                name: 'House Cleaning',
                unit: '/hour',
                label: 'Cleaning Service',
                option: [
                    'Room Cleaning',
                    'Toilet Cleaning',
                    'Window Cleaning',
                    'Ceiling Cleaning',
                    'Attic Cleaning',
                    'Vacuum Cleaning',
                    'Rug Cleaning',
                    'Bed Cleaning',
                    'Leather Furniture Cleaning',
                    'Home Appliances Cleaning',
                    'Sanitizing',
                ],
            },
            {
                id: 'b2',
                name: 'House Handyman',
                unit: '/hour',
                label: 'House Handyman Service',
                option: ['Fixing Broken Furniture', 'Assembling Furniture', 'Wall Painting & Décor Installation', 'Organizing Room'],
            },
            {
                id: 'b3',
                name: 'House Disinfecting',
                unit: '/hour',
                label: 'House Disinfecting Service',
                option: ['Sanitize Surface & Touchpoints', 'Sanitize Floor', 'Sanitize Equipments', 'Sanitize Room'],
            },
        ],
    },
    {
        id: 'c',
        name: 'House Maintenance & Repair',
        sub: [
            {
                id: 'c1',
                name: 'Builder',
                unit: '/day',
                label: 'Builder Service',
                option: [
                    'Soil Excavation',
                    'Landfill',
                    'Concrete Works',
                    'Roof Works',
                    'Flooring Construction',
                    'Wall Painting',
                    'Ceiling Painting',
                    'Wood Painting',
                    'Door Installation & Service',
                    'Window Installation & Service',
                    'Pipe Installation',
                ],
            },
            {
                id: 'c2',
                name: 'Plumber',
                unit: '/day',
                label: 'Plumber Service',
                option: [
                    'Pipes Installation & Service',
                    'Valves Installation & Service',
                    'Drainage System Service',
                    'Plumbing Fixture Service',
                    'Toilet Installation & Service',
                    'Bathtub Installation & Service',
                    'Water Sink Installation & Service',
                    'Water Heater Installation & Service',
                ],
            },
            {
                id: 'c3',
                name: 'Waste Management',
                unit: '/kg',
                label: 'Waste Management Service',
                option: ['Toilet Pump', 'Waste Pump', 'Water Sink Service', 'Toilet Installation & Service', 'Waste Pipe Service'],
            },
            {
                id: 'c4',
                name: 'Electrician',
                unit: '/day',
                label: 'Electrician Service',
                option: [
                    'Electrical Installation',
                    'Electrical Service',
                    'Electrical Repair',
                    'Lights Installation & Repair',
                    'Socket Installation & Repair',
                    'Water Heater Installation',
                    'AC Installation',
                ],
            },
            {
                id: 'c5',
                name: 'Gardener',
                unit: '/day',
                label: 'Gardener Service',
                option: [
                    'Planting Plants',
                    'Planting Grass',
                    'Fertilizing Plants',
                    'Orchid Care',
                    'Bonsai Care',
                    'Garden Landscaping',
                    'Lawn Mowing',
                    'Garden Weeding',
                    'Trimming Trees & Shrubs',
                ],
            },
            {
                id: 'c6',
                name: 'Welder',
                unit: '/day',
                label: 'Welder Service',
                option: [
                    'Window Trellis',
                    'Iron Door',
                    'Canopy',
                    'Gate ',
                    'Fence',
                    'Iron Ladder',
                    'Stair Railing',
                    'Balcony Railing',
                    'Swivel Ladder',
                ],
            },
            {
                id: 'c7',
                name: 'Pest Control',
                unit: '/day',
                label: 'Pest Control Service',
                option: [
                    'Fogging',
                    'Repel Mosquitoes',
                    'Repel Ants',
                    'Repel Cockroaches',
                    'Repel Termites',
                    'Repel Bedbugs',
                    'Repel Rats',
                    'Catch Wild Animals',
                ],
            },
            {
                id: 'c8',
                name: 'Pool & Pond Cleaning',
                unit: '/day',
                label: 'Pool & Pond Cleaning Service',
                option: ['Cleaning Around the Pool', 'Pool Floor & Wall Cleaning', 'Pool Water Care', 'Pump Machine Repair & Service'],
            },
        ],
    },
    {
        id: 'd',
        name: 'Home Décor & Furnitures',
        sub: [
            {
                id: 'd1',
                name: 'Furnitures',
                unit: '/item',
                label: 'Furnitures Service',
                option: [
                    'Custom-Made',
                    'Ready-Made',
                    'Measure at Home',
                    'Delivery',
                    'Assembling',
                    'Repair',
                    'Repaint',
                    'Termite Protection',
                    'Tables',
                    'Desks',
                    'Chairs',
                    'Bench',
                    'Cabinets',
                    'Beds',
                    'Cupboard',
                ],
            },
            {
                id: 'd2',
                name: 'Wallpaper',
                unit: '/m2',
                label: 'Wallpaper Service',
                option: ['Custom-Made', 'Ready-Made', 'Measure at Home', 'Installation', 'Removal'],
            },
            {
                id: 'd3',
                name: 'Cushion & Pillows',
                unit: '/item',
                label: 'Cushion & Pillows Service',
                option: [
                    'Custom-Made',
                    'Ready-Made',
                    'Delivery',
                    'Measure at Home',
                    'Cleaning',
                    'Service',
                    'Chair Cushions',
                    'Bench Cushions',
                    'Chaise Cushions',
                    'Bean Bag',
                    'Rocking Chair Cushions',
                    'Window Seat Cushions',
                    'Wicker Furniture Cushions',
                    'Deep Seating Cushions',
                    'Church Pew Cushions',
                    'Bed Pillows',
                    'Sofa Pillows',
                    'Sitting Pillows',
                ],
            },
            {
                id: 'd4',
                name: 'Sofa',
                unit: '/item',
                label: 'Sofa Service',
                option: ['Custom-Made', 'Ready-Made', 'Delivery', 'Measure at Home', 'Cleaning', 'Service'],
            },
            {
                id: 'd5',
                name: 'Paintings & Wall Decor',
                unit: '/item',
                label: 'Paintings & Wall Decor Service',
                option: ['Custom-Made', 'Ready-Made', 'Delivery', 'Installation'],
            },
            {
                id: 'd6',
                name: 'Mirror',
                unit: '/item',
                label: 'Mirror Service',
                option: ['Custom-Made', 'Ready-Made', 'Delivery', 'Installation'],
            },
            {
                id: 'd7',
                name: 'Rug & Carpet',
                unit: '/item',
                label: 'Rug & Carpet Service',
                option: ['Custom-Made', 'Ready-Made', 'Delivery', 'Measure at Home'],
            },
            {
                id: 'd8',
                name: 'Window Curtain',
                unit: '/m2',
                label: 'Window Curtain Service',
                option: ['Custom-Made', 'Measure at Home', 'Installation', 'Service', 'Cleaning'],
            },
        ],
    },
    {
        id: 'e',
        name: 'Home Appliances',
        sub: [
            {
                id: 'e1',
                name: 'TV Repair',
                unit: '/unit',
                label: 'TV Repair Service',
                option: [
                    'Repair at Home',
                    'Home Pick-Up Repair',
                    'Samsung',
                    'LG',
                    'Sony',
                    'Sharp',
                    'Panasonic',
                    'Polytron',
                    'Phillips',
                    'Xiaomi',
                    'TCL',
                    'Others',
                ],
            },
            {
                id: 'e2',
                name: 'Refrigerator Service',
                unit: '/unit',
                label: 'Refrigerator Service',
                option: [
                    'Repair at Home',
                    'Home Pick-Up Repair',
                    'Cleaning',
                    'LG',
                    'Samsung',
                    'Sharp',
                    'Toshiba',
                    'Polytron',
                    'GEA',
                    'Panasonic',
                    'Aqua',
                    'Midea',
                    'Sanyo',
                    'Sanken',
                    'Electrolux',
                    'Mitsubishi',
                    'Haier',
                    'Others',
                ],
            },
            {
                id: 'e3',
                name: 'AC',
                unit: '/unit',
                label: 'AC Service',
                option: [
                    'Cleaning',
                    'Repair',
                    'Installation',
                    'Removal',
                    'Freon Refill',
                    'Daikin',
                    'Sharp',
                    'Panasonic',
                    'Gree',
                    'Samsung',
                    'Haier',
                    'Denpoo',
                    'LG',
                    'Others',
                ],
            },
            {
                id: 'e4',
                name: 'Fan',
                unit: '/unit',
                label: 'Fan Service',
                option: ['Repair at Home', 'Home Pick-Up Repair', 'Cleaning', 'Standing Fan', 'Ceiling Fan'],
            },
            {
                id: 'e5',
                name: 'Kitchen Appliances',
                unit: '/unit',
                label: 'Kitchen Appliances Service',
                option: [
                    'Repair at Home',
                    'Home Pick-Up Repair',
                    'Cleaning',
                    'Installation',
                    'Gas Stove',
                    'Electric Stove',
                    'Blender',
                    'Coffee Maker',
                    'Toaster',
                    'Oven',
                    'Microwave Oven',
                    'Deep Fryer',
                    'Dish Washer',
                    'Rice Cooker',
                    'Kitchen Exhaust',
                ],
            },
            {
                id: 'e6',
                name: 'Washing Machine',
                unit: '/unit',
                label: 'Washing Machine Service',
                option: [
                    'Repair at Home',
                    'Home Pick-Up Repair',
                    'Cleaning',
                    'LG',
                    'Panasonic',
                    'Samsung',
                    'Aqua',
                    'Sanken',
                    'Sharp',
                    'Electrolux',
                    'Polytron',
                    'Hitachi',
                    'Midea',
                    'Sanyo',
                    'Modena',
                    'Denpoo',
                    'Akari',
                    'Daimitsu',
                    'Bosch',
                    'Others',
                ],
            },
            {
                id: 'e7',
                name: 'Misc. Home Appliances',
                unit: '/unit',
                label: 'Misc. Home Appliances Service',
                option: ['Cleaning', 'Repair at Home', 'Home Pick-Up Repair', 'Installation', 'Removal'],
            },
        ],
    },
    {
        id: 'f',
        name: 'IT Support & Security',
        sub: [
            {
                id: 'f1',
                name: 'Home Internet',
                unit: '/day',
                label: 'Home Internet Service',
                option: ['Troubleshooting', 'Internet Cable Installation', 'Internet Device Repair'],
            },
            {
                id: 'f2',
                name: 'CCTV & Surveillance',
                unit: '/unit',
                label: 'CCTV & Surveillance Service',
                option: ['Installation', 'Repair', 'Removal'],
            },
            {
                id: 'f3',
                name: 'Smartphone Service',
                unit: '/unit',
                label: 'Smartphone Service',
                option: [
                    'Repair',
                    'Screen Protection',
                    'Data Transfer',
                    'Data Recovery',
                    'Xiaomi',
                    'Oppo',
                    'Vivo',
                    'Samsung',
                    'Realme',
                    'Asus',
                    'Pocophone',
                    'Redmi',
                    'Google Pixel',
                    'Oneplus',
                    'Others',
                ],
            },
            {
                id: 'f4',
                name: 'PC Service',
                unit: '/unit',
                label: 'PC Service',
                option: ['Repair & Troubleshooting', 'Software Installation & Setup', 'Virus Removal & Security', 'Data Protection & Recovery'],
            },
        ],
    },
    {
        id: 'g',
        name: 'Day Care',
        sub: [
            {
                id: 'g1',
                name: 'Babysitter',
                unit: '/day',
                label: 'Babysitter Service',
                option: ['Baby', 'Toodler', 'Child'],
            },
            {
                id: 'g2',
                name: 'Child Day Care',
                unit: '/day',
                label: 'Child Day Care Service',
                option: ['Baby', 'Toodler', 'Child'],
            },
            {
                id: 'g3',
                name: 'Eldery Care',
                unit: '/day',
                label: 'Eldery Care Service',
                option: ['Assistance', 'Full Service'],
            },
        ],
    },
    {
        id: 'h',
        name: 'Student Needs',
        sub: [
            {
                id: 'h1',
                name: 'Student Home Tutorship',
                unit: '/hour',
                label: 'Subject Taught',
                option: [
                    'Elementary School',
                    'Junior High School',
                    'High School',
                    'Mathematics',
                    'Language',
                    'English',
                    'Natural Science',
                    'Social Science',
                    'Biology',
                    'Physics',
                    'Chemistry',
                    'Economy',
                    'Sociology',
                    'History',
                    'Geography',
                ],
            },
            {
                id: 'h2',
                name: 'Pre-School Home Tutorship',
                unit: '/hour',
                label: 'Subject Taught',
                option: ['Reading', 'Writing', 'Numbers and Counting', 'Drawing', 'Crafting', 'Storytelling', 'Games'],
            },
        ],
    },
    {
        id: 'i',
        name: 'Health & Well-Being',
        sub: [
            {
                id: 'i1',
                name: 'Masseur',
                unit: '/hour',
                label: 'Health Problems',
                option: ['Sprain', 'Broken Bone', 'Pinched Nerves', 'Tiredness & Lethargic'],
            },
            {
                id: 'i2',
                name: 'Health Check-Up',
                unit: '/person',
                label: 'Type of Health Check-Up',
                option: [
                    'Blood Pressure',
                    'Glucose Level',
                    'Cholesterol Level',
                    'Eye Test',
                    'Weight Measurement',
                    'Height Measurement',
                    'Pregnancy Check-Up',
                    'Elderly Check-Up',
                    'Baby Check-Up',
                    'Health Consultation',
                ],
            },
        ],
    },
    {
        id: 'j',
        name: 'Pets & Animal',
        sub: [
            {
                id: 'j1',
                name: 'Pet Day Care',
                unit: '/day',
                label: 'Pet Day Care Service',
                option: [
                    'Feeding',
                    'Grooming',
                    'Walking',
                    'Cage Cleaning',
                    'Day Care',
                    'Dogs',
                    'Cats',
                    'Hamster',
                    'Lizards',
                    'Turtles',
                    'Snakes',
                    'Arachnids',
                    'Aquatic',
                    'Birds',
                ],
            },
            {
                id: 'j2',
                name: 'Veterinarian',
                unit: '/day',
                label: 'Veterinarian Service',
                option: [
                    'Health Check-Up',
                    'Vaccination',
                    'Sterilization',
                    'Surgery',
                    'Dogs',
                    'Cats',
                    'Hamster',
                    'Lizards',
                    'Turtles',
                    'Snakes',
                    'Arachnids',
                    'Aquatic',
                    'Birds',
                ],
            },
        ],
    },
    {
        id: 'k',
        name: 'Vehicle Service & Maintenance',
        sub: [
            {
                id: 'k1',
                name: 'Mechanic',
                unit: '/vehicle',
                label: 'Mechanic Service',
                option: ['Car', 'Motorbike', 'Bicycle'],
            },
            {
                id: 'k2',
                name: 'Vehicle Cleaning',
                unit: '/vehicle',
                label: 'Vehicle Cleaning Service',
                option: ['Car', 'Motorbike', 'Bicycle', 'Regular Cleaning', 'Wax', 'Window Cleaning', 'Machine Cleaning', 'Interior Cleaning'],
            },
        ],
    },
    {
        id: 'l',
        name: 'Cargo & Moving House',
        sub: [
            {
                id: 'l1',
                name: 'Cargo',
                unit: '/kg',
                label: 'Cargo Service',
                option: ['Pick-Up', 'Normal Size Truck', 'Large Size Truck', 'Loading & Unloading', 'Packaging', 'Delivery'],
            },
            {
                id: 'l2',
                name: 'Moving House',
                unit: '/kg',
                label: 'Moving House Service',
                option: [
                    'Pick-Up',
                    'Normal Size Truck',
                    'Large Size Truck',
                    'Truck Box',
                    'Loading & Unloading',
                    'Packaging',
                    'Delivery',
                    'Organizing',
                ],
            },
        ],
    },
];
