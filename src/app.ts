class ProjectInput {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLFormElement;

    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLTextAreaElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
        this.templateElement = document.getElementById(
            "project-input"
        )! as HTMLTemplateElement;
        this.hostElement = document.getElementById("app")! as HTMLDivElement;

        // Deep-copy template node
        const importedNode = document.importNode(
            this.templateElement.content,
            true
        );
        this.element = importedNode.firstElementChild as HTMLFormElement;
        this.element.id = "user-input";

        this.titleInputElement = this.element.querySelector(
            "#title"
        ) as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector(
            "#description"
        ) as HTMLTextAreaElement;
        this.peopleInputElement = this.element.querySelector(
            "#people"
        ) as HTMLInputElement;

        this.configure();
        this.attach();
    }

    @AutoBind
    private harvestUserInput(): [string, string, number] | void {
        const enteredTitleInput = new StringInput(
            this.titleInputElement.value,
            true,
            5
        );
        const enteredDescriptionInput = new StringInput(
            this.descriptionInputElement.value,
            true,
            5
        );
        const enteredPeopleInput = new NumberInput(
            this.peopleInputElement.value,
            true,
            5
        );

        if (
            enteredTitleInput.valid &&
            enteredDescriptionInput.valid &&
            enteredPeopleInput.valid
        ) {
            return [
                enteredTitleInput.value,
                enteredDescriptionInput.value,
                enteredPeopleInput.value,
            ];
        } else {
            alert("Invalid input exists!");
            return;
        }
    }

    @AutoBind
    private submitHandler(e: Event) {
        e.preventDefault();
        const userInput = this.harvestUserInput();
        console.log(userInput);
    }

    private configure() {
        this.element.addEventListener("submit", this.submitHandler);
    }

    private attach() {
        this.hostElement.insertAdjacentElement("afterbegin", this.element);
    }
}

interface ValidatableInput {
    value: any;
    required: boolean;
    validate(): void;
}

abstract class Input {
    private _valid?: boolean | undefined;
    public get valid(): boolean | undefined {
        return this._valid;
    }
    public set valid(value: boolean | undefined) {
        this._valid = value;
    }
}

class NumberInput extends Input implements ValidatableInput {
    value: number;
    constructor(
        value: number | string,
        public required: boolean,
        public min?: number,
        public max?: number
    ) {
        super();
        this.value =
            typeof value === "string" ? (this.value = parseInt(value)) : value;
        this.validate();
    }

    validate(): void {
        this.valid =
            !(this.required && this.value.toString().trim().length === 0) &&
            (this.min === undefined || this.min <= this.value) &&
            (this.max === undefined || this.value <= this.max);
    }
}

class StringInput extends Input implements ValidatableInput {
    constructor(
        public value: string,
        public required: boolean,
        public minLength?: number,
        public maxLength?: number
    ) {
        super();
        this.validate();
    }

    validate(): void {
        this.valid =
            !(this.required && this.value.toString().trim().length === 0) &&
            (this.minLength === undefined ||
                this.minLength <= this.value.length) &&
            (this.maxLength === undefined ||
                this.value.length <= this.maxLength);
    }
}

/**
 * Method decorator function sample.
 * Called right BEFORE every execution of target method.
 * @param _ Class in which original method is defined
 * @param __ Name of original method
 * @param descriptor PropertyDescriptor of original method
 */
function AutoBind(_: any, __: string | Symbol, descriptor: PropertyDescriptor) {
    // METHOD decorator returns PropertyDescriptor that will overwrite the original one.
    const originalMethod = descriptor.value;
    const adjectiveDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            // An instance is supposed to call a method through PropertyDescriptor.get(), in which we can return an substitute.
            // "this" points whatever object the method belongs to.
            const newMethod = originalMethod.bind(this);
            return newMethod;
        },
    };
    return adjectiveDescriptor;
}

const prjInput = new ProjectInput();
