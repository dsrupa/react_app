// app.test.js
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import App from './App';

jest.mock('axios');

const mockedData = [
  {
    sno: 1,
    name: 'John Doe',
    age: 30,
    phone: '123-456-7890',
    location: 'New York',
    created_at: new Date().toISOString()
  },
  // Add more mocked data as needed
];

describe('App component', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockedData });
  });

  test('renders table with records', async () => {
    render(<App />);

    // Wait for data to be fetched and rendered
    await waitFor(() => {
      mockedData.forEach(record => {
        expect(screen.getByText(record.name)).toBeInTheDocument();
        expect(screen.getByText(record.age.toString())).toBeInTheDocument();
        expect(screen.getByText(record.phone)).toBeInTheDocument();
        expect(screen.getByText(record.location)).toBeInTheDocument();
      });
    });
  });

  test('filters records by search term', async () => {
    render(<App />);

    // Wait for data to be fetched and rendered
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    // Enter search term
    userEvent.type(screen.getByPlaceholderText('Search by Name or Location'), 'John');
    
    // Check if only filtered record is visible
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  // Add more tests for pagination, sorting, etc.
});
