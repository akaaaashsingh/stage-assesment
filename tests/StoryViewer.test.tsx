import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import StoryViewer from "../components/StoryViewer";

const stories = [
  {
    id: "1",
    imageUrl: "https://images3.alphacoders.com/108/1082567.jpg",
    duration: 5,
  },
  {
    id: "2",
    imageUrl:
      "https://w0.peakpx.com/wallpaper/1014/995/HD-wallpaper-hood-black-grey-man-random-white.jpg",
    duration: 5,
  },
  {
    id: "3",
    imageUrl:
      "https://e0.pxfuel.com/wallpapers/126/740/desktop-wallpaper-modern-random-b-scb-modern-earth.jpg",
    duration: 5,
  },
  {
    id: "4",
    imageUrl:
      "https://pics.craiyon.com/2023-11-04/e2186f71271447feb9a01e4f68f55cab.webp",
    duration: 5,
  },
  {
    id: "5",
    imageUrl:
      "https://wallpaperswide.com/download/random_bottle_on_the_street-wallpaper-3840x2400.jpg",
    duration: 5,
  },
  {
    id: "6",
    imageUrl:
      "https://c0.wallpaperflare.com/preview/754/833/65/perspective-street-photography-people-random.jpg",
    duration: 5,
  },
];

jest.useFakeTimers();

test("displays the correct story based on the initial index", () => {
  render(
    <StoryViewer stories={stories} initialStoryIndex={1} onClose={() => {}} />
  );

  // Check if the second story is displayed
  const image = screen.getByRole("img");
  expect(image).toHaveAttribute("src", stories[1].imageUrl);
});

test("automatically advances to the next story after the set duration", () => {
  render(
    <StoryViewer stories={stories} initialStoryIndex={0} onClose={() => {}} />
  );

  // Advance timers by 5 seconds
  act(() => {
    jest.advanceTimersByTime(5000);
  });

  const image = screen.getByRole("img");
  expect(image).toHaveAttribute("src", stories[1].imageUrl);
});

test("allows manual navigation to the next story", () => {
  render(
    <StoryViewer stories={stories} initialStoryIndex={0} onClose={() => {}} />
  );

  const image = screen.getByRole("img");

  // Simulate clicking on the right side of the image
  fireEvent.click(image, { clientX: window.innerWidth });

  expect(screen.getByRole("img")).toHaveAttribute("src", stories[1].imageUrl);
});

test("allows manual navigation to the previous story", () => {
  render(
    <StoryViewer stories={stories} initialStoryIndex={1} onClose={() => {}} />
  );

  const image = screen.getByRole("img");

  // Simulate clicking on the left side of the image
  fireEvent.click(image, { clientX: 0 });

  expect(screen.getByRole("img")).toHaveAttribute("src", stories[0].imageUrl);
});

test("closes the StoryViewer when the close button is clicked", () => {
  const onClose = jest.fn();
  render(
    <StoryViewer stories={stories} initialStoryIndex={0} onClose={onClose} />
  );

  // Simulate clicking the close button
  const closeButton = screen.getByText("X");
  fireEvent.click(closeButton);

  expect(onClose).toHaveBeenCalledTimes(1);
});
