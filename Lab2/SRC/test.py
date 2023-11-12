import re

class ProgramFile(File):
    def __init__(self, name, extension, code_lines):
        super().__init__(name, extension, "")
        self.code_lines = code_lines

    def print_info(self):
        super().print_info()
        print(f"Line Count: {len(self.code_lines)}")
        class_count = self.count_classes()
        method_count = self.count_methods()
        print(f"'class' Count: {class_count}")
        print(f"Method Count: {method_count}")

    def count_classes(self):
        class_keyword = 'class'
        class_lines = [line for line in self.code_lines if class_keyword in line]
        return len(class_lines)

    def count_methods(self):
        method_regex = r'(public|private|protected)?\s*\w+\s*\(.+\)\s*{'
        method_lines = [line for line in self.code_lines if re.match(method_regex, line)]
        return len(method_lines)
