import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MDClass {
    private String id;
    private String label;
    private String url;
    private String type;
    private List<MDClass> children;
    private String parentUrl;




}

