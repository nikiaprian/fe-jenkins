import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import LikeUnlike from "./LikeUnlike";
import axios from "axios";
import { useForumStore, useBlogStore } from "../store/ProductStore";

// Mocking the necessary hooks and modules
jest.mock("../store/ProductStore", () => ({
  useForumStore: jest.fn(),
  useBlogStore: jest.fn(),
}));

jest.mock("axios");

describe("LikeUnlike component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders LikeUnlike component with heart outline icon when not liked", () => {
    // Mock state
    useForumStore.mockReturnValue({ forumId: { id: "1" } });
    useBlogStore.mockReturnValue({ blogId: { id: "1" } });

    // Render the component
    render(<LikeUnlike type="likeForum" />);

    // Verify that the heart outline icon is rendered
    expect(screen.getByTestId('heart-outline')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  test("renders LikeUnlike component with heart solid icon when liked", () => {
    // Mock state
    useForumStore.mockReturnValue({ forumId: { id: "1" } });
    useBlogStore.mockReturnValue({ blogId: { id: "1" } });

    // Mock component state to simulate being liked
    jest.spyOn(React, 'useState').mockImplementationOnce(() => [
      { is_you_like: true, total_likes: 10 },
      jest.fn()
    ]);

    // Render the component
    render(<LikeUnlike type="likeForum" />);

    // Verify that the heart solid icon is rendered
    expect(screen.getByTestId('heart-solid')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  test("handles like button click", async () => {
    // Mock state
    useForumStore.mockReturnValue({ forumId: { id: "1" } });
    useBlogStore.mockReturnValue({ blogId: { id: "1" } });

    // Mock component state to simulate not being liked
    jest.spyOn(React, 'useState').mockImplementationOnce(() => [
      { is_you_like: false, total_likes: 0 },
      jest.fn()
    ]);

    axios.post.mockResolvedValue({});

    // Render the component
    render(<LikeUnlike type="likeForum" />);

    // Simulate click on the heart outline icon
    fireEvent.click(screen.getByTestId('heart-outline'));

    // Verify API call
    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
  });

  test("handles unlike button click", async () => {
    // Mock state
    useForumStore.mockReturnValue({ forumId: { id: "1" } });
    useBlogStore.mockReturnValue({ blogId: { id: "1" } });

    // Mock component state to simulate being liked
    jest.spyOn(React, 'useState').mockImplementationOnce(() => [
      { is_you_like: true, total_likes: 10 },
      jest.fn()
    ]);

    axios.delete.mockResolvedValue({});

    // Render the component
    render(<LikeUnlike type="likeForum" />);

    // Simulate click on the heart solid icon
    fireEvent.click(screen.getByTestId('heart-solid'));

    // Verify API call
    await waitFor(() => expect(axios.delete).toHaveBeenCalledTimes(1));
  });
});
