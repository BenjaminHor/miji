# Tasks
- Implement color themes
  - Choose color theme
  - Add a dropdown menu for users to choose
  - Selection will be saved even on page refresh
    - Using browser local storage
- Implement highlight feature
  - When a tile fits with it's adjacent tiles, the lines/dots should light up to indicate to the player that it fits

# Improving Puzzle Generation
What are some ways we can modify the generation logic?

- Add contraints?
  - There are instances where a tile can fit with another soley due to the tile not having any outward lines on any given side. This produces tiles that can look a bit disjoint from the adjacent tiles
  - One solution would be to add a constraint where every tile must have at least two sides that connect by outward lines
    - We must ensure that the first tile generated follows this constraint

# Color Themes
--bg-color: sub-color (background of the app)
--main-color: main-color (color of highlighted lines/dots)
--sub-color: bg-color (color of the tile)
--text-color: text-color (color of the unhighlighted lines/dots)