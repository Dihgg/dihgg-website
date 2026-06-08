import { render } from "@testing-library/react";
import Icon, { ICON_MAP } from "./Icon";

describe("Icon", () => {
    beforeEach(() => {
        ICON_MAP["tintet-icon"] = {
            icon: <div/>,
            tint: "red"
        };
        ICON_MAP["no-tint-icon"] = {
            icon: <div/>
        };
    });
    it("Should not render an icon for unknown names", () => {
        const { queryByTestId } = render(<Icon name="unknown-non-existent" />);
        expect(queryByTestId("icon")).toBeNull();
    });
    it("should render with the correct tint class when tint is provided", () => {
        const { getByTestId } = render(<Icon name="tintet-icon" tinted />);
        expect(getByTestId("icon")).toHaveClass("red");
    });
    it("should render without tinted if no tint is provided", () => {
        const { getByTestId } = render(<Icon name="no-tint-icon" />);
        expect(getByTestId("icon")).toBeInTheDocument();
    });
});