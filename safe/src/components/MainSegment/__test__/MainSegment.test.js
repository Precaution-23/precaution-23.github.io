import { render, screen } from '@testing-library/react';
import MainSegment from "../MainSegment"

describe("Run test for top main segment text", () => {
    it("should render same test passed as props", async() => {
        render(<MainSegment mainSegmentText="Ready" /> )
        const topLeftElement = screen.getByText(/ready/i)
        expect(topLeftElement).toBeInTheDocument()
    })
})
