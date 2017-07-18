<aura:application extends="force:slds" description="Sample wrapper test app">

    <c:BaseTestRunnerCmp testspecs="{!join(',', 
    	$Resource.lightningDataGridTests
    )}" />

    <!--  placeholder div which example test specs use to render components under test -->
    <div aura:id="renderTestComponents" id="renderTestComponents"></div>
</aura:application>