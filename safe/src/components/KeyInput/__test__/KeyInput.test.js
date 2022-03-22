import { render, fireEvent } from '@testing-library/react';
import KeyInput from "../KeyInput"
import useAppDispatch from "../../../Services/redux/reduxHooks"

jest.mock("../../../Services/redux/reduxHooks");

let getByTestId;

const renderComponent = ({ name }) =>
  render(
    <LocalStorageMock items={{ name }}>
      <PersistentForm />
    </LocalStorageMock>
  );

describe("Lock button", () => {

    beforeEach(() => {
        const component = render(<KeyInput/>)
        getByTestId = component.getByTestId
    })

    it("should check the letter on the lock button", async() => {
        const lockBtn = getByTestId("lockButton")
        expect(lockBtn.textContent).toBe("L")
    })

    it("should click on  the lock button", async() => {
        const lockBtn = getByTestId("lockButton")

        fireEvent.click(lockBtn);


    })
})
