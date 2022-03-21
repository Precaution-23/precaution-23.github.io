import { render, screen } from '@testing-library/react';
import TopLeftSegment from '../TopLeftSegment';


describe("Run test for top left segment text", () => {
    it("should render same test passed as props", async() => {
        render(<TopLeftSegment topLeftSegment="Unlocked" /> )
        const topLeftElement = screen.getByText(/unlocked/i)
        expect(topLeftElement).toBeInTheDocument()
    })
})


