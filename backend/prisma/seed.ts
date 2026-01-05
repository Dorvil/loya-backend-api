import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { Role } from '../src/common/enums';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // 1. Create Tenant
  const tenant = await prisma.tenant.create({
    data: {
      name: 'Loya Demo',
    },
  });
  console.log('Created Tenant:', tenant.name);

  // 2. Create Admin
  const passwordHash = await bcrypt.hash('Admin@123', 10);
  const admin = await prisma.user.create({
    data: {
      email: 'admin@loya.com',
      passwordHash,
      role: Role.ADMIN,
      tenantId: tenant.id,
    },
  });
  console.log('Created Admin:', admin.email);

  // 3. Create Products
  const productsData = [
    { name: 'Camiseta Loya', sku: 'TSHIRT-001', barcode: '789111222001', price: 49.90, stock: 100 },
    { name: 'Caneca Dev', sku: 'MUG-002', barcode: '789111222002', price: 29.90, stock: 50 },
    { name: 'Teclado Mecânico', sku: 'KB-003', barcode: '789111222003', price: 250.00, stock: 20 },
    { name: 'Mouse Gamer', sku: 'MSE-004', barcode: '789111222004', price: 120.00, stock: 30 },
    { name: 'Monitor 24"', sku: 'MON-005', barcode: '789111222005', price: 890.00, stock: 10 },
  ];

  for (const p of productsData) {
    await prisma.product.create({
      data: {
        ...p,
        tenantId: tenant.id,
      },
    });
  }
  console.log('Created 5 Products');

  // 4. Create Customers
  const customersData = [
    { name: 'João Silva', cpf: '111.111.111-11', phone: '(11) 99999-1111' },
    { name: 'Maria Souza', cpf: '222.222.222-22', phone: '(11) 99999-2222' },
    { name: 'Carlos Oliveira', cpf: '333.333.333-33', phone: '(11) 99999-3333' },
  ];

  for (const c of customersData) {
    await prisma.customer.create({
      data: {
        ...c,
        tenantId: tenant.id,
      },
    });
  }
  console.log('Created 3 Customers');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
