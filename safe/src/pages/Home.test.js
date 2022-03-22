import { render, fireEvent, screen } from '@testing-library/react';
import useAppDispatch from "../Services/redux/reduxHooks"
import Home from "./Home"

jest.mock("../Services/redux/reduxHooks");

const mockedSetLockProcess = jest.fn()

describe("Lock Safe", () => {
    const numbers = ['1', '2','3','4','5','6']

    beforeEach(() => {
        // render(<KeyInput setLockProcess={mockedSetLockProcess} />)
        // render(<TopLeftSegment topLeftSegment/>)
        render(<Home topLeftSegment/>)
    })

    afterEach(() => {
        jest.cl
    })

    it("should check the letter on the lock button", async() => {
        const lockBtn = screen.getByTestId("lockButton")
        expect(lockBtn.textContent).toBe("L")
    })


    it("should check the letter on the lock button", async() => {
        const lockBtn = screen.getByTestId("lockButton")
        expect(lockBtn.textContent).toBe("L")
    })

    it("should unlock safe", async() => {
        const topLeftElement = screen.getByTestId("topLeftSegment")

        numbers.forEach((number) =>{
            const lockBtnText = screen.getByText(number)
            fireEvent.click(lockBtnText)
        })
        await expect(topLeftElement.textContent).toBe('Unlocked')

    })

    it("should lock safe", async() => {
        const lockBtn = screen.getByTestId("lockButton")
        const topLeftElement = screen.getByTestId("topLeftSegment")

        numbers.forEach((number) =>{
            const lockBtnText = screen.getByText(number)
            fireEvent.click(lockBtnText)
        })
        fireEvent.click(lockBtn)
 
        setTimeout(() => {
            expect(topLeftElement.textContent).toBe('Locked')
        }, 2000)
        screen.debug()
        

    })
})
