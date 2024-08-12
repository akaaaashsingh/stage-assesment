import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import StoryList from "../components/StoryList";

const mock = new MockAdapter(axios);

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

beforeEach(() => {
  mock.reset();
});

test("renders story thumbnails", async () => {
  mock.onGet("/api/stories").reply(200, stories);

  render(<StoryList />);

  const thumbnails = await screen.findAllByRole("img");
  expect(thumbnails).toHaveLength(stories.length);

  expect(screen.getByAltText("Story 1")).toBeInTheDocument();
});

test("opens the StoryViewer when a story is clicked", async () => {
  mock.onGet("/api/stories").reply(200, stories);

  render(<StoryList />);

  const thumbnail = await screen.findByAltText("Story 1");

  fireEvent.click(thumbnail);

  expect(screen.getByAltText("Story 1")).toBeInTheDocument();
});
