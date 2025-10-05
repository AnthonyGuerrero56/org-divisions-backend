import 'reflect-metadata';
import { AppDataSource } from './datasource';
import { Division } from '../divisions/division.entity';

async function runSeed() {
  await AppDataSource.initialize();
  const repo = AppDataSource.getRepository(Division);

  await repo.clear();

  const root = await repo.save(repo.create({
    name: 'Dirección General',
    ambassadorFullName: 'Ana Martínez',
    level: 1,
    collaboratorsCount: 50,
  }));

  const parents: Division[] = [];
  for (let i = 1; i <= 5; i++) {
    const d = await repo.save(repo.create({
      name: `División ${i}`,
      parentId: root.id,
      ambassadorFullName: `Embajador ${i}`,
      level: 2,
      collaboratorsCount: Math.floor(Math.random() * 100) + 10,
    }));
    parents.push(d);
  }

  for (let j = 1; j <= 25; j++) {
    const parent = parents[Math.floor(Math.random() * parents.length)];
    await repo.save(repo.create({
      name: `Subdivisión ${j}`,
      parentId: parent.id,
      ambassadorFullName: `SubEmbajador ${j}`,
      level: 3,
      collaboratorsCount: Math.floor(Math.random() * 50) + 5,
    }));
  }

  console.log('Seed con ~31 divisiones creado correctamente');
  await AppDataSource.destroy();
}

runSeed().catch((e) => { console.error(e); process.exit(1); });