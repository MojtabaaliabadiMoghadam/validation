export default class Validation {
  constructor(idform, options = {}) {
    this.class_is_invalid = options.class_is_invalid ?? "is-invalid";
    this.class_is_valid = options.class_is_valid ?? "is-valid";
    this.element_box_error = options.element_box_error ?? "div";
    const form = document.getElementById(idform);
    const rulee_extra = {};
    const attributes = [];
    const custom_message = {};
    this.custom_attribute = options.attribute || {};
    this.custom_message = options.messages || {};
    this.rulee_extra = options.rules || {};
    this.attributes = options.attributes || {};
    const inputs = form.querySelectorAll("input");
    //get form and inputs
    const is_filled = (value) =>
      value !== undefined && value !== null && value !== "";
    //check input is full or not
     this.messages = {
      required: "The :attribute is required",
      min: "Minimum limit error",
      max: "Maximum limit error",
      filled: "Maximum limit error",
      is_lowercase: "The :attribute must be in lowercase.",
      is_array: "The :attribute must be an array.",
      is_ascii: "The :attribute must contain only ASCII characters.",
      is_between: "The :attribute must be between :min and :max.",
      is_boolean: "The :attribute must be a boolean value.",
      is_confirmed: "The :attribute confirmation does not match.",
      is_date: "The :attribute is not a valid date.",
      is_decimal: "The :attribute must be a decimal number.",
      is_different: "The :attribute and :other must be different.",
      is_digits: "The :attribute must only contain digits.",
      has_digits: "The :attribute must contain :numberOfDigits digits.",
      is_distinct: "The :attribute must have distinct values.",
      doesnt_start_with: "The :attribute must not start with :substring.",
      doesnt_end_with: "The :attribute must not end with :substring.",
      is_email: "The :attribute must be a valid email address.",
      is_enum: "The :attribute must be one of :enumValues.",
      is_file: "The :attribute must be a file.",
      is_in: "The :attribute must be one of the allowed values.",
      in_array: "The :attribute must exist in the array.",
      is_integer: "The :attribute must be an integer.",
      is_json: "The :attribute must be a valid JSON.",
      is_lowercase: "The :attribute must be in lowercase.",
      is_max: "The :attribute may not be greater than :max.",
      ...this.custom_message,
    };
    //messages
    function is_array(value) {
      return Array.isArray(value);
    }

    function is_ascii(value) {
      const asciiRegex = /^[\x00-\x7F]+$/;
      return asciiRegex.test(value);
    }

    function is_between(value, min, max) {
      return value >= min && value <= max;
    }

    function is_boolean(value) {
      return typeof value === "boolean";
    }

    function is_confirmed(value, confirmationValue) {
      return value === confirmationValue;
    }

    function is_date(value) {
      return !isNaN(new Date(value).getTime());
    }

    function is_decimal(value) {
      const decimalRegex = /^-?\d+(\.\d+)?$/;
      return decimalRegex.test(value);
    }

    function is_different(value, otherValue) {
      return value !== otherValue;
    }

    function is_digits(value) {
      const digitsRegex = /^\d+$/;
      return digitsRegex.test(value);
    }

    function has_digits(value, numberOfDigits) {
      const digitsRegex = new RegExp(`^\\d{${numberOfDigits}}$`);
      return digitsRegex.test(value);
    }

    function is_distinct(array) {
      return array.length === new Set(array).size;
    }

    function doesnt_start_with(value, substring) {
      return !value.startsWith(substring);
    }

    function doesnt_end_with(value, substring) {
      return !value.endsWith(substring);
    }

    function is_email(value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);
    }

    function is_enum(value, enumValues) {
      return enumValues.includes(value);
    }

    function is_file(value) {
      return true;
    }

    function is_in(value, allowedValues) {
      return allowedValues.includes(value);
    }

    function in_array(value, array) {
      return array.includes(value);
    }

    function is_integer(value) {
      return Number.isInteger(value);
    }

    function is_json(value) {
      try {
        JSON.parse(value);
        return true;
      } catch (error) {
        return false;
      }
    }

    function is_lowercase(value) {
      return value === value.toLowerCase();
    }

    function is_max(value, max) {
      return value <= max;
    }
    //todo make error message for that function
    //functions
     this.rules_validations = {
      required: (v) => is_filled(v),
      min: (v, minValue) => v.trim().length >= minValue,
      max: (v, maxValue) => v.trim().length <= maxValue,
      filled: (v) => v === null || is_filled(v),
      is_array: (v) => is_array(v),
      is_ascii: (v) => is_ascii(v),
      is_between: (v, minValue, maxValue) => is_between(v, minValue, maxValue),
      is_boolean: (v) => is_boolean(v),
      is_confirmed: (v, confirmationValue) =>
        is_confirmed(v, confirmationValue),
      is_date: (v) => is_date(v),
      is_decimal: (v) => is_decimal(v),
      is_different: (v, otherValue) => is_different(v, otherValue),
      is_digits: (v) => is_digits(v),
      has_digits: (v, numberOfDigits) => has_digits(v, numberOfDigits),
      is_distinct: (array) => is_distinct(array),
      doesnt_start_with: (v, substring) => doesnt_start_with(v, substring),
      doesnt_end_with: (v, substring) => doesnt_end_with(v, substring),
      is_email: (v) => is_email(v),
      is_enum: (v, enumValues) => is_enum(v, enumValues),
      is_file: (v) => is_file(v),
      is_in: (v, allowedValues) => is_in(v, allowedValues),
      in_array: (v, array) => in_array(v, array),
      is_integer: (v) => is_integer(v),
      is_json: (v) => is_json(v),
      is_lowercase: (v) => is_lowercase(v),
      is_max: (v, max) => is_max(v, max),
      ...this.rulee_extra,
    };
    // rules
    const validateInput = (input, rules) => {
      let hasError = false;
      let errorMessage = "";

      rules.some((rule) => {
        const ruleParts = rule.split(":");
        const ruleName = ruleParts[0];
        const ruleValue = parseInt(ruleParts[1]);

        if (this.rules_validations[ruleName]) {
          const validationFunction = this.rules_validations[ruleName];
          if (!validationFunction(input.value, ruleValue)) {
            let message_temprrory = this.messages[ruleName];
            if (message_temprrory.includes(":attribute")) {
              let attribute =
                input.dataset.validation_attribute ||
                this.attributes[input.getAttribute("name")] ||
                input.getAttribute("name") ||
                input.getAttribute("placeholder");
              message_temprrory = message_temprrory.replace(
                ":attribute",
                attribute
              );
            }
            errorMessage = message_temprrory;
            hasError = true;
            return true; // Stop further iteration
          }
        }
        return false;
      });
      // Show error message if validation fails
      const Element_error_Message = input.nextElementSibling;
      if (hasError) {
        if (
          Element_error_Message &&
          Element_error_Message.classList.contains("invalid-feedback")
        ) {
          Element_error_Message.remove();
        }

        const new_Elemnt_ErrorMessage = document.createElement(
          this.element_box_error
        );
        new_Elemnt_ErrorMessage.classList.add("invalid-feedback");
        new_Elemnt_ErrorMessage.innerText = errorMessage;

        input.classList.remove(this.class_is_valid);
        input.classList.add(this.class_is_invalid);
        input.insertAdjacentElement("afterend", new_Elemnt_ErrorMessage);
      } else {
        // Hide error message if validation passes
        if (
          Element_error_Message &&
          Element_error_Message.classList.contains("invalid-feedback")
        ) {
          Element_error_Message.remove();
        }
        input.classList.remove(this.class_is_invalid);
        input.classList.add(this.class_is_valid);
      }
    };
    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        const rules = input.dataset.validation
          ? input.dataset.validation.split("|")
          : [];
        validateInput(input, rules);
        const result = this.is_valid_input(inputs);
        console.log(result);
      });
    });

    //give input and rule to validateInput
  }
  is_valid_input(inputs) {
    let isValid = true;
  
    inputs.forEach((input) => {
      const rules = input.dataset.validation ? input.dataset.validation.split("|") : [];
  
      rules.some((rule) => {
        const [ruleName, ruleValue] = rule.split(":");
    
        if (this.rules_validations[ruleName]) {
          const validationFunction = this.rules_validations[ruleName];
          if (!validationFunction(input.value, ruleValue)) {
            isValid = false; // Set isValid to false if any validation fails
            return true; // Exit the some loop for this input
          }
        }
        return false;
      });
    });
  
    return isValid; // Return overall validation status
  }
}
