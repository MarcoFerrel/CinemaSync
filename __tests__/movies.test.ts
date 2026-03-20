describe("Movies API", () => {
  it("should return movies within 500ms", async () => {
    const start = Date.now();

    const response = await fetch("http://localhost:3000/api/movies");
    const data = await response.json();

    const duration = Date.now() - start;
    console.log(`Response time: ${duration}ms`);

    expect(response.status).toBe(200);
    expect(data.results).toBeDefined();
    expect(data.results.length).toBeGreaterThan(0);
    expect(duration).toBeLessThan(500);
  });

  it("should return correct movie structure", async () => {
    const response = await fetch("http://localhost:3000/api/movies");
    const data = await response.json();

    const movie = data.results[0];

    expect(movie).toHaveProperty("id");
    expect(movie).toHaveProperty("title");
    expect(movie).toHaveProperty("poster_path");
    expect(movie).toHaveProperty("vote_average");
  });
});
