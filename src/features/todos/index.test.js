import { cleanup, fireEvent, screen, waitFor } from "@testing-library/react";
import { renderWithStoreAndRouter } from "../../config/test.helpers";
import apiFirebaseMock from "../../config/api.firebase";
import Todos from "./index";
import { createTodo } from "./__test__/helpers";

jest.mock('../../config/api.firebase')

describe('Tests - Todos component', function () {
  afterEach(() => cleanup())

  test('should add a todo', async () => {
    apiFirebaseMock.fetchTodos.mockResolvedValueOnce({data: []})

    renderWithStoreAndRouter(<Todos />, '/?filter=all')

    fireEvent.change(screen.getByPlaceholderText(/add your todo.../i), {
      target: {value: "adding a test todo"}
    })
    expect(screen.getByDisplayValue(/adding a test todo/i)).toBeInTheDocument()

    fireEvent.click(screen.getByText(/^Add$/))
    expect(apiFirebaseMock.saveTodos).toHaveBeenCalled()

    await waitFor(() => expect(screen.getByText(/adding a test todo/i)).toBeInTheDocument())
  });

  test('should edit a todo', async () => {
    const todos = [createTodo('test todo')]
    apiFirebaseMock.fetchTodos.mockResolvedValueOnce({data: todos})

    renderWithStoreAndRouter(<Todos />, '/?filter=all')

    await screen.findByText(/test todo/i)
    fireEvent.click(screen.getByText(/edit/i))
    expect(screen.getByDisplayValue(/test todo/i)).toBeInTheDocument()

    fireEvent.change(screen.getByDisplayValue(/test todo/i), {target: {value: 'Updated todo'}})
    await waitFor(() => expect(screen.getByDisplayValue(/Updated todo/i)).toBeInTheDocument())
    fireEvent.click(screen.getByText(/save/i))

    await screen.findByText(/Updated todo/i)
    expect(apiFirebaseMock.saveTodos).toHaveBeenCalled()
  });

  test('should delete a todo', async () => {
    expect.assertions(1)
    
    const todos = [createTodo("Try to remove me")]
    const todoTitleRegex = /Try to remove me/
    apiFirebaseMock.fetchTodos.mockResolvedValueOnce({data: todos})

    renderWithStoreAndRouter(<Todos />, '/?filter=all')

    await screen.findByText(todoTitleRegex)
    fireEvent.click(screen.getByText(/^Delete$/))

    expect(await screen.findByText(todoTitleRegex)).not.toBeInTheDocument()
  });
});
