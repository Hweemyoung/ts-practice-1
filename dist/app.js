"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
class ProjectInput {
    constructor() {
        this.templateElement = document.getElementById("project-input");
        this.hostElement = document.getElementById("app");
        // Deep-copy template node
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        this.element.id = "user-input";
        this.titleInputElement = this.element.querySelector("#title");
        this.descriptionInputElement = this.element.querySelector("#description");
        this.peopleInputElement = this.element.querySelector("#people");
        this.configure();
        this.attach();
    }
    harvestUserInput() {
        return [
            this.titleInputElement.value,
            this.descriptionInputElement.value,
            parseInt(this.peopleInputElement.value),
        ];
    }
    submitHandler(e) {
        e.preventDefault();
        const userInput = this.harvestUserInput();
        console.log(userInput);
    }
    configure() {
        this.element.addEventListener("submit", this.submitHandler);
    }
    attach() {
        this.hostElement.insertAdjacentElement("afterbegin", this.element);
    }
}
__decorate([
    AutoBind
], ProjectInput.prototype, "harvestUserInput", null);
__decorate([
    AutoBind
], ProjectInput.prototype, "submitHandler", null);
/**
 * Method decorator function sample.
 * Called right BEFORE every execution of target method.
 * @param _ Class in which original method is defined
 * @param __ Name of original method
 * @param descriptor PropertyDescriptor of original method
 */
function AutoBind(_, __, descriptor) {
    // METHOD decorator returns PropertyDescriptor that will overwrite the original one.
    const originalMethod = descriptor.value;
    const adjectiveDescriptor = {
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
//# sourceMappingURL=app.js.map