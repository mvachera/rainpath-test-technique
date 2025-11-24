import type { Case, CreateCaseDto } from '../types/case.types';

const API_BASE_URL = 'http://localhost:3000';

export const casesApi = {
  async getAllCases(): Promise<Case[]> {
    const response = await fetch(`${API_BASE_URL}/cases`);
    if (!response.ok) throw new Error('Failed to fetch cases');
    return response.json();
  },

  async getCaseById(id: string): Promise<Case> {
    const response = await fetch(`${API_BASE_URL}/cases/${id}`);
    if (!response.ok) throw new Error('Failed to fetch case');
    return response.json();
  },

  async createCase(data: CreateCaseDto): Promise<Case> {
    const response = await fetch(`${API_BASE_URL}/cases`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create case');
    return response.json();
  },
};