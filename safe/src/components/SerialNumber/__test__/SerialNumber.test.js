import { render, screen } from '@testing-library/react';
import SerialNumber from "../SerialNumber"

describe("run test for serial number number", () => {
    it("should render same test passed as props", async() => {
        render(<SerialNumber serialNum="Ready" /> )
        const bottonRightRlement = screen.getByText(/ready/i)
        expect(bottonRightRlement).toBeInTheDocument()
    })
})