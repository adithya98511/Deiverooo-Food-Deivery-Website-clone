import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "../../../src/components/Footer/Footer"; // Adjust the import path as needed
describe("Footer component", () => {
  it("should render the footer component", () => {
    // Render the Footer component
    render(<Footer />);
    // Check if the footer is rendered by querying any text or elements from the component
    const footerElement = screen.getByText(/Discover Deliveroo/i);
    expect(footerElement).toBeInTheDocument();
  });
});
