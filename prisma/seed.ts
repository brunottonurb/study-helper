import 'dotenv/config';
import * as bcrypt from 'bcryptjs';
import { categories } from '../src/data/categories';
import { topics } from '../src/data/topics';
import { prisma } from '../src/lib/prisma';

async function main() {
  console.log('Starting seed...');

  // Create default admin user
  const hashedPassword = await bcrypt.hash('admin', 10);
  await prisma.admin.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: hashedPassword,
    },
  });
  console.log('Created admin user (username: admin, password: admin)');

  // Seed categories
  console.log('Seeding categories...');
  for (const category of categories) {
    await prisma.category.upsert({
      where: { id: category.id },
      update: {
        name: category.name,
        description: category.description,
        icon: category.icon,
        color: category.color,
      },
      create: {
        id: category.id,
        name: category.name,
        description: category.description,
        icon: category.icon,
        color: category.color,
      },
    });
  }
  console.log(`Seeded ${categories.length} categories`);

  // Seed topics with relations
  console.log('Seeding topics...');
  for (const topic of topics) {
    await prisma.topic.upsert({
      where: { id: topic.id },
      update: {
        title: topic.title,
        description: topic.description,
        icon: topic.icon || '',
        categoryId: topic.category,
        confidence: topic.confidence,
        lastReviewed: topic.lastReviewed,
      },
      create: {
        id: topic.id,
        title: topic.title,
        description: topic.description,
        icon: topic.icon || '',
        categoryId: topic.category,
        confidence: topic.confidence,
        lastReviewed: topic.lastReviewed,
      },
    });

    // Delete existing relations to avoid duplicates
    await prisma.keyPoint.deleteMany({ where: { topicId: topic.id } });
    await prisma.codeExample.deleteMany({ where: { topicId: topic.id } });
    await prisma.quizQuestion.deleteMany({ where: { topicId: topic.id } });
    await prisma.resource.deleteMany({ where: { topicId: topic.id } });

    // Seed key points
    for (let i = 0; i < topic.keyPoints.length; i++) {
      await prisma.keyPoint.create({
        data: {
          topicId: topic.id,
          title: topic.keyPoints[i].title,
          description: topic.keyPoints[i].description,
          order: i,
        },
      });
    }

    // Seed code examples
    for (let i = 0; i < topic.codeExamples.length; i++) {
      await prisma.codeExample.create({
        data: {
          topicId: topic.id,
          title: topic.codeExamples[i].title,
          language: topic.codeExamples[i].language,
          code: topic.codeExamples[i].code,
          explanation: topic.codeExamples[i].explanation,
          order: i,
        },
      });
    }

    // Seed quiz questions
    if (topic.quizQuestions) {
      for (let i = 0; i < topic.quizQuestions.length; i++) {
        await prisma.quizQuestion.create({
          data: {
            topicId: topic.id,
            question: topic.quizQuestions[i].question,
            answer: topic.quizQuestions[i].answer,
            order: i,
          },
        });
      }
    }

    // Seed resources
    if (topic.resources) {
      for (let i = 0; i < topic.resources.length; i++) {
        await prisma.resource.create({
          data: {
            topicId: topic.id,
            url: topic.resources[i],
            order: i,
          },
        });
      }
    }
  }
  console.log(`Seeded ${topics.length} topics with all relations`);

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
