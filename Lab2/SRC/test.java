import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class ProgramFile extends File {
    private List<String> codeLines;

    public ProgramFile(String name, String extension, List<String> codeLines) {
        super(name, extension, "");
        this.codeLines = codeLines;
    }

    public void printInfo() {
        super.printInfo();
        System.out.println("Line Count: " + codeLines.size());
        int classCount = countClasses();
        int methodCount = countMethods();
        System.out.println("'class' Count: " + classCount);
        System.out.println("Method Count: " + methodCount);
    }

    private int countClasses() {
        String classKeyword = "class";
        long classLines = codeLines.stream().filter(line -> line.contains(classKeyword)).count();
        return (int) classLines;
    }

    private int countMethods() {
        String methodRegex = "(public|private|protected)?\\s*\\w+\\s*\\(.+\\)\\s*{";
        long methodLines = codeLines.stream().filter(line -> line.matches(methodRegex)).count();
        return (int) methodLines;
    }
}