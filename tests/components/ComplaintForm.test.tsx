import ComplaintForm from "@/components/complaintForm";
import { Toaster } from "@/components/ui/toaster";
import { ComplaintData } from "@/schemas/complaintSchema";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

type TestComplaintData = {
  [K in keyof ComplaintData]: any;
};

describe("ComplaintForm", () => {
  const renderComponent = () => {
    render(
      <>
        <ComplaintForm />
        <Toaster />
      </>,
    );
    const user = userEvent.setup();

    const titleField = screen.getByRole("textbox", { name: /title/i });
    const descriptionField = screen.getByRole("textbox", {
      name: /description/i,
    });

    const resetButton = screen.getByRole("button", { name: /reset/i });
    const submitButton = screen.getByRole("button", { name: /submit/i });

    const validData = {
      title: "x".repeat(2),
      description: "x".repeat(100),
    };

    const submitForm = async (complaint: TestComplaintData) => {
      if (complaint.title) await user.type(titleField, complaint.title);
      if (complaint.description)
        await user.type(descriptionField, complaint.description);

      await user.click(submitButton);
    };

    return {
      user,
      submitForm,
      validData,
      inputs: { titleField, descriptionField },
      buttons: { resetButton, submitButton },
    };
  };

  it("should render form fields", () => {
    const {
      inputs: { titleField, descriptionField },
      buttons: { resetButton, submitButton },
    } = renderComponent();

    expect(titleField).toBeInTheDocument();
    expect(descriptionField).toBeInTheDocument();

    expect(resetButton).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it("should initialy focus on title field", () => {
    const {
      inputs: { titleField },
    } = renderComponent();

    expect(titleField).toHaveFocus();
  });

  it.each([
    {
      scenario: "too short",
      title: null,
      errorMessage: /2/,
    },
    {
      scenario: "only spaces",
      title: " ".repeat(5),
      errorMessage: /2/,
    },
    {
      scenario: "too long",
      title: "x".repeat(256),
      errorMessage: /255/,
    },
  ])(
    "should display an error if title is $scenario",
    async ({ title, errorMessage }) => {
      const { submitForm, validData } = renderComponent();

      await submitForm({
        ...validData,
        title,
      });

      const error = screen.getByRole("alert");
      expect(error).toHaveTextContent(errorMessage);
    },
  );

  it.each([
    {
      scenario: "too short",
      description: null,
      errorMessage: /10/,
    },
    {
      scenario: "only spaces",
      description: " ".repeat(5),
      errorMessage: /10/,
    },
    {
      scenario: "too long",
      description: "x".repeat(1001),
      errorMessage: /1000/,
    },
  ])(
    "should display an error if description is $scenario",
    async ({ description, errorMessage }) => {
      const { submitForm, validData } = renderComponent();

      await submitForm({
        ...validData,
        description,
      });

      const error = screen.getByRole("alert");
      expect(error).toHaveTextContent(errorMessage);
    },
  );

  it("should update description field chars indicator after typing", async () => {
    const {
      user,
      inputs: { descriptionField },
    } = renderComponent();

    await user.type(descriptionField, "x".repeat(50));

    const charsIndicator = screen.getByText("50 / 1000");
    expect(charsIndicator).toBeInTheDocument();
  });

  it("should render toast if form is submitted successfully", async () => {
    const { submitForm, validData } = renderComponent();

    await submitForm(validData);

    const toast = screen.getByText(/success/i);
    expect(toast).toBeInTheDocument();
  });
});
