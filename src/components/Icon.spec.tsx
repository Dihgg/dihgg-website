import { render } from "@testing-library/react";
import Icon, { ICON_MAP } from "./Icon";

describe("Icon", () => {
    beforeEach(() => {
        ICON_MAP["tinted-icon"] = {
            icon: <div/>,
            tint: "tinted-class"
        };
        ICON_MAP["no-tinted-icon"] = {
            icon: <div/>
        };
    });
    it("Should not render an icon for unknown names", () => {
        const { queryByTestId } = render(<Icon name="unknown-non-existent" />);
        expect(queryByTestId("icon")).toBeNull();
    });
    it("should render with the correct tint class when tint is provided", () => {
        const { getByTestId } = render(<Icon name="tinted-icon" tinted />);
        expect(getByTestId("icon")).toHaveClass("tinted-class");
    });
    it("should render without tinted if no tint is provided", () => {
        const { getByTestId } = render(<Icon name="no-tinted-icon" />);
        expect(getByTestId("icon")).not.toHaveClass("tinted-class");
    });
});