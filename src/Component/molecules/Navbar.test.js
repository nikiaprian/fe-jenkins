import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
import useAuthStore from "../store/AuthStore";
import Swal from "sweetalert2";

jest.mock("axios");
jest.mock("sweetalert2");

describe("Navbar Component", () => {
  const setIsLoggedIn = jest.fn();
  const setUser = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
    // Mocking `useNavigate`
    jest.spyOn(require("react-router-dom"), "useNavigate").mockImplementation(() => mockNavigate);
  });

  test("renders navbar with logo and navigation links", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByAltText("logo")).toBeInTheDocument();
    expect(screen.getByText("ForumIn")).toBeInTheDocument();
    expect(screen.getByText("BlogIn")).toBeInTheDocument();
    expect(screen.getByText("Tentang")).toBeInTheDocument();
    expect(screen.getByText("FaQ")).toBeInTheDocument();
  });

  test("shows login and register buttons when not logged in", () => {
    jest.spyOn(useAuthStore, "default").mockReturnValue({
      isLoggedIn: false,
      setIsLoggedIn,
      setUser
    });

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByText("Daftar")).toBeInTheDocument();
    expect(screen.getByText("Masuk")).toBeInTheDocument();
  });

  test("shows profile and logout buttons when logged in", async () => {
    jest.spyOn(useAuthStore, "default").mockReturnValue({
      isLoggedIn: true,
      setIsLoggedIn,
      setUser
    });

    axios.get.mockResolvedValue({ data: { data: { photo: null } } });

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /Keluar/i })).toBeInTheDocument();
      expect(screen.getByAltText("")).toHaveAttribute("src", "http://localhost/fotoProfil.png");
    });
  });

  test("handles logout correctly", async () => {
    jest.spyOn(useAuthStore, "default").mockReturnValue({
      isLoggedIn: true,
      setIsLoggedIn,
      setUser
    });

    axios.get.mockResolvedValue({ data: { data: { photo: null } } });

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /Keluar/i }));

    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith("Berhasil!", "Anda Telah Berhasil Logout!", "success");
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });

  test("toggle menu on mobile view", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /icon/i }));

    expect(screen.getByRole("button", { name: /icon-x/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /icon-x/i }));

    expect(screen.getByRole("button", { name: /icon/i })).toBeInTheDocument();
  });
});
