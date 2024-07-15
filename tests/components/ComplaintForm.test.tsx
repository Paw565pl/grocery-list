import ComplaintForm from "@/components/complaintForm";
import { Toaster } from "@/components/ui/toaster";
import { ComplaintData } from "@/schemas/complaintSchema";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

type TestComplaintData = Partial<ComplaintData>;

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
    const descriptionFieldCharsIndicator = screen.getByRole("paragraph");

    const resetButton = screen.getByRole("button", { name: /reset/i });
    const submitButton = screen.getByRole("button", { name: /submit/i });

    const validData = {
      title: "x".repeat(2),
      description: "x".repeat(100),
    };

    const fillForm = async (complaint: TestComplaintData, submit = true) => {
      if (complaint.title) await user.type(titleField, complaint.title);
      if (complaint.description)
        await user.type(descriptionField, complaint.description);

      if (submit) await user.click(submitButton);
    };

    return {
      user,
      fillForm,
      validData,
      inputs: { titleField, descriptionField },
      buttons: { resetButton, submitButton },
      descriptionFieldCharsIndicator,
    };
  };

  it("should render form elements", () => {
    const {
      inputs: { titleField, descriptionField },
      buttons: { resetButton, submitButton },
      descriptionFieldCharsIndicator,
    } = renderComponent();

    expect(titleField).toBeInTheDocument();
    expect(descriptionField).toBeInTheDocument();
    expect(descriptionFieldCharsIndicator).toHaveTextContent(/0 \/ 1000/);

    expect(resetButton).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it.each([
    {
      scenario: "too short",
      title: undefined,
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
      const { fillForm, validData } = renderComponent();

      await fillForm({
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
      description: undefined,
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
      const { fillForm, validData } = renderComponent();

      await fillForm({
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
      descriptionFieldCharsIndicator,
    } = renderComponent();

    await user.type(descriptionField, "x".repeat(50));

    expect(descriptionFieldCharsIndicator).toHaveTextContent(/50 \/ 1000/);
  });

  it('should reset form when "reset" button is clicked', async () => {
    const {
      user,
      fillForm,
      validData,
      inputs,
      buttons: { resetButton },
      descriptionFieldCharsIndicator,
    } = renderComponent();

    await fillForm(validData, false);
    await user.click(resetButton);

    Object.values(inputs).forEach((input) => {
      expect(input).toHaveValue("");
    });
    expect(descriptionFieldCharsIndicator).toHaveTextContent(/0 \/ 1000/);
  });

  it("should reset form when form is submitted", async () => {
    const {
      user,
      fillForm,
      validData,
      inputs,
      buttons: { submitButton },
      descriptionFieldCharsIndicator,
    } = renderComponent();

    await fillForm(validData);
    await user.click(submitButton);

    Object.values(inputs).forEach((input) => {
      expect(input).toHaveValue("");
    });
    expect(descriptionFieldCharsIndicator).toHaveTextContent(/0 \/ 1000/);
  });

  it("should render toast if form is submitted", async () => {
    const { fillForm, validData } = renderComponent();

    await fillForm(validData);

    const toast = screen.getByText(/success/i);
    expect(toast).toBeInTheDocument();
  });
});
