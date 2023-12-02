import { LitElement } from "lit";
import { common } from '../assets/common'
import { timeTaken } from '../components/time-taken'
import { badge } from '../components/my-badge'
import { puzzleSwitcher } from '../components/puzzle-switcher'
import '../components/my-card'

export const PuzzleToggle = (superClass) => {
  class PuzzleToggleElement extends superClass {
    static properties = {
      selectedPuzzle: { state: true, type: String },
      puzzles: { state: true, type: Object },
      puzzle: { state: true, type: Object },
      title: { type: String },
      isPart2: { state: true, type: Boolean },
    };

    static styles = [common]

    togglePuzzle({ currentTarget }) {
      const { value } = currentTarget
      this.selectedPuzzle = value
    }

    setSelectedPuzzle(puzzle) {
      this.selectedPuzzle = puzzle
    }

    constructor(puzzles) {
      super();
      this.puzzle = []
      this.puzzles = puzzles
      this.selectedPuzzle = 'examplePuzzle'
      this.isPart2 = false
      this.startTime = performance.now()
    }

    timeTaken() {
      return timeTaken(this.startTime)
    }

    badge(label) {
      return badge(label)
    }

    puzzleSwitcher(url) {
      const { puzzles, selectedPuzzle, togglePuzzle } = this
      return puzzleSwitcher(selectedPuzzle, puzzles, togglePuzzle, url)
    }

    togglePart() {
      this.isPart2 = !this.isPart2
    }

    updated(updates) {
      super.updated(updates)
      const { parseInput, puzzles, selectedPuzzle } = this
      if (updates.has('selectedPuzzle') && parseInput) {
        this.startTime = performance.now()
        this.puzzle = parseInput(puzzles[selectedPuzzle])
      }
    }
  }
  return PuzzleToggleElement;
};

export const PuzzleToggleWithLit = PuzzleToggle(LitElement)
