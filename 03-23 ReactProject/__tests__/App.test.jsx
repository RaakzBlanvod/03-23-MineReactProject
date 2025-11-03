import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from '../src/App'

describe('App Component', () => {
  it('renders task manager', () => {
    render(<App />)
    expect(screen.getByPlaceholderText('Введите задачу')).toBeInTheDocument()
  })

  it('adds new task when form is submitted', () => {
    render(<App />)
    
    const input = screen.getByPlaceholderText('Введите задачу')
    const submitButton = screen.getByText('Add Task')
    
    fireEvent.change(input, { target: { value: 'New test task' } })
    fireEvent.click(submitButton)
    
    expect(screen.getByText('New test task')).toBeInTheDocument()
  })
})