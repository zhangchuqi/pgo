# Creation and Update of Processes

BPMN Process Knowledge Documentation (Camunda Official Website):
[camunda](https://camunda.com/bpmn/ ':camunda')


## 1.Process Creation
### 1.1、Overview of Process Creation Steps
1、From the PGO main page, select Modeler → New

![照片描述](./image/Modeler.png)

![照片描述](./image/new.png)

***

### 1.2、Node Functions and Attributes
#### Start Node

Each process begins with a StartEvent node

![照片描述](./image/startEvent.png)

***

#### Task Node

For each task node, different actions are performed to meet various requirements. Generally, the task type is set as Service Task, unless there are special handling cases, such as splitting or parallel tasks.

![照片描述](./image/TaskNode1.png)


Service Task attribute settings.

![照片描述](./image/TaskNode2.png)

***

#### Getway
Handle different business processes based on various conditions, using gateways to manage different business branches.
Depending on business requirements, set different types.
For example, under different conditions, handle each business process separately; the type selection can refer to the Camunda official website.

![照片描述](./image/Gateway1.png)

![照片描述](./image/Gateway2.png)


Gateway attribute settings:

![照片描述](./image/Gateway3.png)

***

#### End Node

Each process ends with an End Event node.

![照片描述](./image/EndNode.png)

***

### 1.3、Creation of Special Process Nodes

#### Splitting Sub-Processes



When there are multiple business data entries that need to be processed in parallel individually, you can set the Task node type to Call Activity and parallel Multi Instance.

![照片描述](./image/SplittingSub-Processes1.png)

![照片描述](./image/SplittingSub-Processes2.png)

![照片描述](./image/SplittingSub-Processes3.png)

Node Attribute Settings:

![照片描述](./image/SplittingSub-Processes4.png)

Note: After deploying the process, fill in the Element Variable in the Variables section of the first node configuration of the sub-process as follows:

![照片描述](./image/SplittingSub-Processes5.png)

***

#### Automatic Process Retry

When a process may experience delays or access failures after a certain node due to network issues or other non-subjective problems, and the business requires the process to be automatically retried, you can configure a timer node after this node. The node type is as follows:

![照片描述](./image/AutomaticProcessRetry1.png)

![照片描述](./image/AutomaticProcessRetry2.png)

Attribute configuration:

![照片描述](./image/AutomaticProcessRetry3.png)

***

### 1.4、Process Download and Upload

The process can be exported and downloaded locally:

![照片描述](./image/ProcessDownloadandUpload1.png)

![照片描述](./image/ProcessDownloadandUpload2.png)

![照片描述](./image/ProcessDownloadandUpload3.png)

The process can be uploaded to the target environment via Modeler → BPMN → Import.

![照片描述](./image/ProcessDownloadandUpload4.png)

***

## 2.Process Update (Version Management)

When you need to modify a process:

![照片描述](./image/ProcessUpdate1.png)

Click the corresponding update for this process to enter the modification interface.

![照片描述](./image/ProcessUpdate2.png)

Then click update. The main Deploy page will display the modified process, with the version set to 2.

![照片描述](./image/ProcessUpdate3.png)

Next, enter the configuration of the previous version (version 1). For each node, disconnect the mapping/outbound/connector.

![照片描述](./image/ProcessUpdate4.png)

Finally, connect the mapping/outbound/connector from version 3 to the new version process nodes, or modify/add new mapping/outbound/connector to the new version process nodes. At this point, the process update is complete.

![照片描述](./image/ProcessUpdate5.png)

 > [!note]  If you want to delete the old version of the process, be sure to confirm that all incidents for this version in history → system log are stopped before deleting this version; otherwise, the deletion will fail.
