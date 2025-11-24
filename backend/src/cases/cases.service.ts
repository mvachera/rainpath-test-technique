import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateCaseDto } from '../types/case.types';

@Injectable()
export class CasesService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async createCase(createCaseDto: CreateCaseDto) {
    return this.case.create({
      data: {
        prelevements: {
          create: createCaseDto.prelevements.map((prel) => ({
            blocs: {
              create: prel.blocs.map((bloc) => ({
                lames: {
                  create: bloc.lames.map((lame) => ({
                    coloration: lame.coloration,
                  })),
                },
              })),
            },
          })),
        },
      },
      include: {
        prelevements: {
          include: {
            blocs: {
              include: {
                lames: true,
              },
            },
          },
        },
      },
    });
  }

  async getAllCases() {
    return this.case.findMany({
      include: {
        prelevements: {
          include: {
            blocs: {
              include: {
                lames: true,
              },
            },
          },
        },
      },
    });
  }

  async getCaseById(id: number) {
    return this.case.findUnique({
      where: { id },
      include: {
        prelevements: {
          include: {
            blocs: {
              include: {
                lames: true,
              },
            },
          },
        },
      },
    });
  }
}