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
    private harvestUserInput(): [string, string, number] {
        return [
            this.titleInputElement.value,
            this.descriptionInputElement.value,
            parseInt(this.peopleInputElement.value),
        ];
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
